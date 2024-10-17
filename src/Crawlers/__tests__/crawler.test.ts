import { API } from "../../utils/constants";
import { apiCrawler } from "../apiCrawler";

describe("apiCrawler", () => {
	let callServer: jest.Mock;

	beforeEach(() => {
		callServer = jest.fn();

		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should fetch data successfully when login is successful", async () => {
		callServer.mockResolvedValueOnce({
			status: 200,
			data: {
				access_token: "mockAccessToken",
			},
		});

		callServer.mockResolvedValueOnce({
			data: {
				list: [
					{
						naam: "Doe",
						firstname: "John",
						functienaam: "Developer",
						email: "john.doe@example.com",
						adres: "123 Main St, Suite 101",
					},
					{
						naam: "Smith",
						firstname: "Jane",
						functienaam: "Manager",
						email: "jane.smith@example.com",
						adres: "456 Second St, Floor 2",
					},
				],
			},
		});

		const result = await apiCrawler(callServer);

		expect(callServer).toHaveBeenCalledTimes(2);
		expect(callServer).toHaveBeenCalledWith(API.AuthLogin, {
			login: "test",
			password: "Hhj46Gj6",
		});
		expect(callServer).toHaveBeenCalledWith(
			API.RelatiebeheerNiveau9List,
			{},
			"mockAccessToken"
		);

		expect(result).toEqual([
			{
				naam: "Doe",
				firstname: "John",
				functienaam: "Developer",
				email: "john.doe@example.com",
				adres: "123 Main St, Suite 101",
			},
			{
				naam: "Smith",
				firstname: "Jane",
				functienaam: "Manager",
				email: "jane.smith@example.com",
				adres: "456 Second St, Floor 2",
			},
		]);
	});

	it("should return undefined if login fails", async () => {
		callServer.mockResolvedValueOnce({
			status: 401,
			data: null,
		});

		const result = await apiCrawler(callServer);

		expect(callServer).toHaveBeenCalledTimes(1);
		expect(callServer).toHaveBeenCalledWith(API.AuthLogin, {
			login: "test",
			password: "Hhj46Gj6",
		});
		expect(result).toBeUndefined();
	});

	it("should handle errors gracefully", async () => {
		callServer.mockRejectedValue(new Error("Network error"));

		await apiCrawler(callServer);

		expect(console.error).toHaveBeenCalledWith(
			"Error in browserFactory:",
			expect.any(Error)
		);
	});
});
