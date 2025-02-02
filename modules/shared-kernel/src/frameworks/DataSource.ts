import { failure, success } from "@open-vanilla/result";
import type { Result } from "@open-vanilla/result";

import type { DataSourceBoundary } from "../adapters/EntityGateway";

type NetworkClient = {
	delete: <Output>(
		endpoint: `/${string}`,
		payload?: { token?: string },
	) => Promise<Result<Output>>;
	get: <Output>(
		endpoint: `/${string}`,
		payload?: { token?: string },
	) => Promise<Result<Output>>;
	post: <Output>(
		endpoint: `/${string}`,
		payload: { body: Record<string, unknown>; token?: string },
	) => Promise<Result<Output>>;
	put: <Output>(
		endpoint: `/${string}`,
		payload: { body: Record<string, unknown>; token?: string },
	) => Promise<Result<Output>>;
};

type NetworkDataSource<Boundary extends DataSourceBoundary> = Boundary & {
	client: NetworkClient;
};

export const createNetworkDataSourceFactory = <
	Boundary extends DataSourceBoundary,
>(
	baseUrl: string,
	factory: (client: NetworkClient) => Boundary,
) => {
	const client: NetworkClient = {
		async delete(endpoint, payload) {
			return request("DELETE", new URL(endpoint, baseUrl), payload);
		},
		async get(endpoint, payload) {
			return request("GET", new URL(endpoint, baseUrl), payload);
		},
		async post(endpoint, payload) {
			return request("POST", new URL(endpoint, baseUrl), payload);
		},
		async put(endpoint, payload) {
			return request("PUT", new URL(endpoint, baseUrl), payload);
		},
	};

	return (): NetworkDataSource<Boundary> => {
		return {
			...factory(client),
			client,
		};
	};
};

const request = async <Output>(
	method: "DELETE" | "GET" | "POST" | "PUT",
	url: URL,
	options: {
		body?: Record<string, unknown>;
		token?: string;
	} = {},
) => {
	const createClientError = (message: string) => {
		return new Error(
			[`An error occured while fetching \`${url.href}\``, message].join(
				"\n",
			),
		);
	};

	try {
		const response = await fetch(url, {
			...(options.body && { body: serializeRecord(options.body) }),
			headers: {
				"Content-Type": "application/json",
				...(options.token && {
					Authorization: `Bearer ${options.token}`,
				}),
			},
			method,
		});

		if (!response.ok) {
			return failure(
				createClientError(
					`Received a non-successful code \`${response.status}\` from the server with the following message \`${response.statusText}\``,
				),
			);
		}

		const output = (await response.json()) as Output;

		return success(output);
	} catch (error) {
		return failure(
			createClientError(
				`Unable to fetch due to a rejected promise. More details: \`${String(error)}\``,
			),
		);
	}
};

const serializeRecord = (input: Record<string, unknown>) => {
	return JSON.stringify(input);
};
