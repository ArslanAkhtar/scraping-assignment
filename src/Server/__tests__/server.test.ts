import https from "https";
import { callServer } from "../server";

jest.mock("https", () => ({
	request: jest.fn(),
}));

describe("callServer function", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(https.request as jest.Mock).mockImplementation(
			(url, options, callback) => {
				const res = {
					on: jest.fn((event, cb) => {
						if (event === "data") {
							cb('{"success": true}');
						}
						if (event === "end") {
							cb();
						}
					}),
					statusCode: 200,
					headers: {},
				};
				callback(res);
				return {
					on: jest.fn(),
					write: jest.fn(),
					end: jest.fn(),
				};
			}
		);
	});

	it("should resolve with parsed JSON response on success", async () => {
		const result = await callServer("/api/test", { key: "value" }, "token123");
		expect(result).toEqual({
			data: { success: true },
			status: 200,
			headers: {},
		});
	});

	it("should reject if JSON parsing fails", async () => {
		(https.request as jest.Mock).mockImplementation(
			(url, options, callback) => {
				const res = {
					on: jest.fn((event, cb) => {
						if (event === "data") {
							cb("Invalid JSON");
						}
						if (event === "end") {
							cb();
						}
					}),
					statusCode: 200,
					headers: {},
				};
				callback(res);
				return {
					on: jest.fn(),
					write: jest.fn(),
					end: jest.fn(),
				};
			}
		);

		await expect(callServer("/api/test", { key: "value" })).rejects.toThrow(
			"Error parsing JSON response"
		);
	});

	it("should reject on request error", async () => {
		(https.request as jest.Mock).mockImplementation(
			(url, options, callback) => {
				return {
					on: jest.fn((event, cb) => {
						if (event === "error") {
							cb(new Error("Request failed"));
						}
					}),
					write: jest.fn(),
					end: jest.fn(),
				};
			}
		);

		await expect(callServer("/api/test", { key: "value" })).rejects.toThrow(
			"Request failed"
		);
	});
});
