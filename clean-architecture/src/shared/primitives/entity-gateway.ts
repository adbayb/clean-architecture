import type { Result } from "@open-vanilla/result";
import type { AnyInput } from "./any-input";
import type { EntityGatewayBoundary } from "./entity";
import type { Mapper } from "./mapper";

export type DataSourceBoundary<DataSourceDto = unknown> = {
	create: (payload: Partial<DataSourceDto>) => Promise<Result<DataSourceDto>>;
	delete: (id: number | string) => Promise<Result<boolean>>;
	read: (id: number | string) => Promise<Result<DataSourceDto>>;
	readMany: () => Promise<Result<DataSourceDto[]>>;
	toDto: Mapper<AnyInput, DataSourceDto>;
};

export type EntityGatewayFactory<
	Output extends EntityGatewayBoundary,
	Input extends DataSourceBoundary = DataSourceBoundary,
> = (input: Input) => Output;
