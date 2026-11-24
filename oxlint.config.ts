import stackConfig from "@adbayb/stack/oxlint";

export default {
	...stackConfig,
	jsPlugins: [...stackConfig.jsPlugins, "eslint-plugin-boundaries"],
	rules: {
		...stackConfig.rules,
		// Enforce architecture boundaries and Clean Architecture dependency rules for direct imports.
		"boundaries/dependencies": [
			"error",
			{
				checkInternals: true,
				default: "allow",
				policies: [
					{
						disallow: { to: { element: { type: "host" } } },
						from: { element: { type: ["module", "slice", "shared"] } },
					},
					{
						disallow: { to: { element: { type: ["module", "slice"] } } },
						from: { element: { type: "shared" } },
					},
					{
						disallow: { to: { element: { type: "slice" } } },
						from: { element: { type: "host" } },
					},
					{
						disallow: {
							to: { element: { fileInternalPath: "!index.ts", type: "module" } },
						},
						from: { element: { type: "host" } },
					},
					{
						disallow: {
							to: { element: { fileInternalPath: "!index.ts", type: "shared" } },
						},
						from: { element: { type: ["host", "module", "slice"] } },
					},
					{
						disallow: {
							to: {
								element: {
									captured: { module: "!{{ from.element.captured.module }}" },
									type: "slice",
								},
							},
						},
						from: { element: { type: ["module", "slice"] } },
					},
					{
						disallow: {
							to: {
								element: {
									captured: { module: "!{{ from.element.captured.module }}" },
									fileInternalPath: "!index.ts",
									type: "module",
								},
							},
						},
						from: { element: { type: ["module", "slice"] } },
					},
					{
						disallow: {
							to: {
								element: {
									captured: {
										module: "{{ from.element.captured.module }}",
										slice: "!{{ from.element.captured.slice }}",
									},
									fileInternalPath: "!index.ts",
									type: "slice",
								},
							},
						},
						from: { element: { type: "slice" } },
					},
					{
						allow: {
							to: {
								element: {
									captured: { module: "{{ from.element.captured.module }}" },
									fileInternalPath: "entities/index.ts",
									type: "slice",
								},
							},
						},
						from: { element: { type: "slice" } },
					},
					{
						disallow: {
							to: { file: { categories: ["use-cases", "adapters", "frameworks"] } },
						},
						from: { file: { categories: "entities" } },
					},
					{
						disallow: {
							to: {
								element: {
									fileInternalPath: "index.ts",
									type: "slice",
								},
							},
						},
						from: {
							element: { type: "slice" },
							file: { categories: ["entities", "use-cases", "adapters"] },
						},
					},
					{
						disallow: { to: { file: { categories: ["adapters", "frameworks"] } } },
						from: { file: { categories: "use-cases" } },
					},
					{
						disallow: { to: { file: { categories: "frameworks" } } },
						from: { file: { categories: "adapters" } },
					},
				],
			},
		],
	},
	settings: {
		"boundaries/elements": [
			{
				capture: ["module", "slice"],
				partialMatch: false,
				pattern: "clean-architecture/src/modules/*/*",
				type: "slice",
			},
			{
				capture: ["module"],
				partialMatch: false,
				pattern: "clean-architecture/src/modules/*",
				type: "module",
			},
			{
				partialMatch: false,
				pattern: "clean-architecture/src/shared",
				type: "shared",
			},
			{
				partialMatch: false,
				pattern: "clean-architecture/src/hosts/*",
				type: "host",
			},
		],
		"boundaries/files": [
			{ category: "entities", pattern: "clean-architecture/src/modules/*/*/entities/**/*" },
			{ category: "use-cases", pattern: "clean-architecture/src/modules/*/*/use-cases/**/*" },
			{ category: "adapters", pattern: "clean-architecture/src/modules/*/*/adapters/**/*" },
			{
				category: "frameworks",
				pattern: "clean-architecture/src/modules/*/*/frameworks/**/*",
			},
		],
		"boundaries/include": ["clean-architecture/src/**/*"],
		"import/resolver": {
			typescript: { project: "clean-architecture/tsconfig.json" },
		},
	},
};
