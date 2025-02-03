import type { Result } from "@open-vanilla/result";

import type { EntityGatewayBoundary } from "../entities/Entity";
import type { Mapper } from "../Mapper";
import type { AnyInput } from "../AnyInput";

export type EntityGatewayFactory<
	Output extends EntityGatewayBoundary,
	Input extends DataSourceBoundary = DataSourceBoundary,
> = (input: Input) => Output;

export type DataSourceBoundary<DataSourceDto = unknown> = {
	create: (payload: Partial<DataSourceDto>) => Promise<Result<DataSourceDto>>;
	delete: (id: number | string) => Promise<Result<boolean>>;
	read: (id: number | string) => Promise<Result<DataSourceDto>>;
	readMany: () => Promise<Result<DataSourceDto[]>>;
	toDto: Mapper<AnyInput, DataSourceDto>;
};
