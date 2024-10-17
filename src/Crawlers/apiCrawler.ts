import {
	LoginResponse,
	ListResponse,
	CallServerFunction,
	UserData,
} from "../utils/interface";
import { API } from "../utils/constants";

export const apiCrawler = async (callServer: CallServerFunction) => {
	try {
		const loginResponse = (await callServer(API.AuthLogin, {
			login: "test",
			password: "Hhj46Gj6",
		})) as LoginResponse;

		if (loginResponse.status === 200 && loginResponse.data) {
			const access_token = loginResponse.data.access_token;

			const listResponse = (await callServer(
				API.RelatiebeheerNiveau9List,
				{},
				access_token
			)) as ListResponse;

			const extractedData = listResponse.data.list?.map((entry: UserData) => ({
				naam: entry.naam,
				firstname: entry.firstname,
				functienaam: entry.functienaam,
				email: entry.email,
				adres: entry.adres,
			}));

			return extractedData;
		}
	} catch (error) {
		console.error("Error in browserFactory:", error);
	}
};
