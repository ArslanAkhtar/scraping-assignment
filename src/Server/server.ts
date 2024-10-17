import https from "https";
import { serverBaseUrl } from "../utils/constants";

export const callServer = (
	api: string,
	params: object,
	access_token?: string
): Promise<object> => {
	return new Promise((resolve, reject) => {
		const postData = params ? JSON.stringify(params) : null;
		const url = serverBaseUrl + api;

		const headers: { [key: string]: string } = {
			"Content-Type": "application/json; charset=UTF-8",
		};

		if (access_token) {
			headers["Authorization"] = `Bearer ${access_token}`;
		}

		const options = {
			method: postData ? "POST" : "GET",
			headers: headers,
		};

		const req = https.request(url, options, (response) => {
			let data = "";
			response.on("data", (chunk) => {
				data += chunk;
			});

			response.on("end", () => {
				try {
					resolve({
						data: data.length > 0 ? JSON.parse(data) : {},
						status: response.statusCode,
						headers: response.headers,
					});
				} catch (error) {
					reject(new Error("Error parsing JSON response"));
				}
			});
		});

		req.on("error", reject);

		if (postData) {
			req.write(postData);
		}

		req.end();
	});
};
