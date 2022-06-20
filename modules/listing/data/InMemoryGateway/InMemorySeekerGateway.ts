import { Seeker, SeekerGatewayPort } from "../../domain/entities/Seeker";

export const inMemorySeekerGateway: SeekerGatewayPort = {
	getOne(id) {
		const seeker = SEEKERS.find((seeker) => seeker.id === id);

		if (!seeker) {
			throw new Error("Not found"); // @todo: custom error in shared kernel
		}

		return seeker;
	},
};

const SEEKERS: Array<Seeker> = [
	{
		id: 1,
		firstname: "John",
		lastname: "Doe",
		favorites: [],
	},
	{
		id: 2,
		firstname: "Jane",
		lastname: "Doe",
		favorites: [],
	},
];
