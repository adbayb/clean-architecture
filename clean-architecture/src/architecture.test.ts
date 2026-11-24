/// <reference types="node" />

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const sourceRoot = "clean-architecture/src";
const catalog = `${sourceRoot}/modules/catalog`;
const product = `${catalog}/product`;
const feature = `${catalog}/get-products`;
const orders = `${sourceRoot}/modules/orders`;
let fixtureRoot: string;

const createImport = (kind: "dynamic" | "type" | "value", specifier: string) => {
	const imports = {
		dynamic: `export const get = () => import("${specifier}");`,
		type: `export type { Contract } from "${specifier}";`,
		value: `export { value } from "${specifier}";`,
	};

	return imports[kind];
};

const createSpecifier = (fromPath: string, toPath: string) => {
	const path = relative(dirname(fromPath), toPath).replace(/\.ts$/u, "");

	return path.startsWith(".") ? path : `./${path}`;
};

describe("architecture boundaries", () => {
	beforeAll(() => {
		const prefix = join(tmpdir(), "clean-architecture-boundaries-");

		fixtureRoot = realpathSync(mkdtempSync(prefix));

		for (const target of [
			`${product}/entities/entity.ts`,
			`${product}/entities/index.ts`,
			`${product}/adapters/gateway.ts`,
			`${product}/frameworks/provider.ts`,
			`${product}/index.ts`,
			`${catalog}/index.ts`,
			`${catalog}/internal.ts`,
			`${orders}/index.ts`,
			`${orders}/order/entities/entity.ts`,
			`${sourceRoot}/shared/index.ts`,
			`${sourceRoot}/shared/primitives/private.ts`,
			`${sourceRoot}/hosts/web/main.ts`,
		]) {
			const path = join(fixtureRoot, target);

			mkdirSync(dirname(path), { recursive: true });
			writeFileSync(path, "export type Contract = string;\nexport const value = 1;\n");
		}
	});

	afterAll(() => {
		rmSync(fixtureRoot, { force: true, recursive: true });
	});

	test.each([
		[
			"entity to adapter type",
			`${product}/entities/probe.ts`,
			`${product}/adapters/gateway.ts`,
			"type",
			true,
		],
		[
			"use case to framework",
			`${feature}/use-cases/probe.ts`,
			`${product}/frameworks/provider.ts`,
			"value",
			true,
		],
		[
			"adapter to entity",
			`${product}/adapters/probe.ts`,
			`${product}/entities/entity.ts`,
			"value",
			false,
		],
		[
			"framework to adapter",
			`${product}/frameworks/probe.ts`,
			`${product}/adapters/gateway.ts`,
			"value",
			false,
		],
		[
			"slice entity API",
			`${feature}/use-cases/probe.ts`,
			`${product}/entities/index.ts`,
			"type",
			false,
		],
		[
			"slice outer API from framework",
			`${feature}/frameworks/probe.ts`,
			`${product}/index.ts`,
			"value",
			false,
		],
		[
			"slice outer API from use case",
			`${feature}/use-cases/probe.ts`,
			`${product}/index.ts`,
			"value",
			true,
		],
		[
			"slice internals",
			`${feature}/use-cases/probe.ts`,
			`${product}/entities/entity.ts`,
			"type",
			true,
		],
		["own slice barrel", `${product}/entities/probe.ts`, `${product}/index.ts`, "type", true],
		["cross-module API", `${product}/entities/probe.ts`, `${orders}/index.ts`, "type", false],
		[
			"cross-module internals",
			`${product}/entities/probe.ts`,
			`${orders}/order/entities/entity.ts`,
			"type",
			true,
		],
		[
			"module entry to other slice",
			`${catalog}/probe.ts`,
			`${orders}/order/entities/entity.ts`,
			"type",
			true,
		],
		[
			"cross-module root internals",
			`${orders}/order/entities/probe.ts`,
			`${catalog}/internal.ts`,
			"type",
			true,
		],
		[
			"module root internals",
			`${sourceRoot}/hosts/web/probe.ts`,
			`${catalog}/internal.ts`,
			"value",
			true,
		],
		[
			"host to module API",
			`${sourceRoot}/hosts/web/probe.ts`,
			`${catalog}/index.ts`,
			"value",
			false,
		],
		[
			"host to slice",
			`${sourceRoot}/hosts/web/probe.ts`,
			`${product}/index.ts`,
			"dynamic",
			true,
		],
		[
			"shared API",
			`${feature}/use-cases/probe.ts`,
			`${sourceRoot}/shared/index.ts`,
			"type",
			false,
		],
		[
			"shared internals",
			`${feature}/use-cases/probe.ts`,
			`${sourceRoot}/shared/primitives/private.ts`,
			"type",
			true,
		],
		["shared to module", `${sourceRoot}/shared/probe.ts`, `${catalog}/index.ts`, "value", true],
		[
			"module to host",
			`${product}/frameworks/probe.ts`,
			`${sourceRoot}/hosts/web/main.ts`,
			"value",
			true,
		],
	] as const)("should check %s", (_name, from, to, kind, forbidden) => {
		const fromPath = join(fixtureRoot, from);
		const toPath = join(fixtureRoot, to);

		mkdirSync(dirname(fromPath), { recursive: true });

		const specifier = createSpecifier(fromPath, toPath);

		writeFileSync(fromPath, `${createImport(kind, specifier)}\n`);

		const result = spawnSync(
			join(root, "node_modules/.bin/oxlint"),
			["-c", join(root, "oxlint.config.ts"), "-f", "json", fromPath],
			{
				cwd: root,
				encoding: "utf8",
				env: { ...process.env, ESLINT_PLUGIN_BOUNDARIES_ROOT_PATH: fixtureRoot },
			},
		);

		expect(result.error).toBeUndefined();
		expect(result.stderr).toBe("");
		expect(result.stdout).toMatch(/"number_of_files":\s*1/u);
		expect(result.stdout.includes('"code": "boundaries(dependencies)"')).toBe(forbidden);
	});
});
