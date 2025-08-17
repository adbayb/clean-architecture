import { failure, success } from "@open-vanilla/result";
import type { Result } from "@open-vanilla/result";

import type { DataSourceBoundary } from "./EntityGateway";

type NetworkClient<NetworkDto> = {
	delete: (
		endpoint: `/${string}`,
		payload?: { token?: string },
	) => Promise<Result<NetworkDto>>;
	get: <Output = NetworkDto>(
		endpoint: `/${string}`,
		payload?: { token?: string },
	) => Promise<Result<Output>>;
	post: (
		endpoint: `/${string}`,
		payload: { body: Record<string, unknown>; token?: string },
	) => Promise<Result<NetworkDto>>;
	put: (
		endpoint: `/${string}`,
		payload: { body: Record<string, unknown>; token?: string },
	) => Promise<Result<NetworkDto>>;
};

type NetworkDataSource<
	Boundary extends DataSourceBoundary,
	NetworkDto,
> = Boundary & {
	client: NetworkClient<NetworkDto>;
};

export const createNetworkDataSourceFactory = <
	Boundary extends DataSourceBoundary,
	NetworkDto,
>(
	baseUrl: `https://${string}/`,
	factory: (client: NetworkClient<NetworkDto>) => Boundary,
) => {
	const createEndpoint = (endpoint: `/${string}`) => {
		return [
			baseUrl.replaceAll(/\/$/g, ""),
			endpoint.replaceAll(/^\//g, ""),
		].join("/");
	};

	const client: NetworkClient<NetworkDto> = {
		async delete(endpoint, payload) {
			return request("DELETE", createEndpoint(endpoint), payload);
		},
		async get(endpoint, payload) {
			return request("GET", createEndpoint(endpoint), payload);
		},
		async post(endpoint, payload) {
			return request("POST", createEndpoint(endpoint), payload);
		},
		async put(endpoint, payload) {
			return request("PUT", createEndpoint(endpoint), payload);
		},
	};

	return (): NetworkDataSource<Boundary, NetworkDto> => {
		return {
			...factory(client),
			client,
		};
	};
};

const request = async <Output>(
	method: "DELETE" | "GET" | "POST" | "PUT",
	url: string,
	options: {
		body?: Record<string, unknown>;
		token?: string;
	} = {},
) => {
	const createError = (message: string) => {
		return new Error(
			[`An error occured while fetching \`${url}\`.`, message].join("\n"),
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
				createError(
					`Received a non-successful code \`${response.status}\` from the server with the following message \`${response.statusText}\`.`,
				),
			);
		}

		const output = (await response.json()) as Output;

		return success(output);
	} catch (error) {
		return failure(
			createError(
				`Unable to fetch due to a rejected promise. More details: \`${String(error)}\`.`,
			),
		);
	}
};

const serializeRecord = (input: Record<string, unknown>) => {
	return JSON.stringify(input);
};
