import type { Result } from "@open-vanilla/result";

import type { EntityGatewayBoundary } from "../entities/Entity";

export type EntityGatewayFactory<
	Output extends EntityGatewayBoundary,
	Input extends DataSourceBoundary = DataSourceBoundary,
> = (input: Input) => Output;

export type DataSourceBoundary<
	DataSourceEntity = unknown,
	Selector extends string = string,
> = {
	create: (
		payload: Partial<DataSourceEntity>,
	) => Promise<Result<DataSourceEntity>>;
	delete: (id: Selector) => Promise<Result<boolean>>;
	read: (id: Selector) => Promise<Result<DataSourceEntity>>;
	readAll: () => Promise<Result<DataSourceEntity[]>>;
};
