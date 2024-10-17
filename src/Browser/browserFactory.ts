import { callServer } from "../Server/server";
import { apiCrawler } from "../Crawlers/apiCrawler";
import { generateCSV, generateHTMLTable } from "../utils/helper";
import {
	outputCSVFileName,
	outputFIlePath,
	outputHTMLFileName,
} from "../utils/constants";

export default async function browserFactory(crawlType: string) {
	try {
		if (crawlType === "api") {
			const data = await apiCrawler(callServer);
			generateCSV(data, outputFIlePath + outputCSVFileName);
			generateHTMLTable(data, outputFIlePath + outputHTMLFileName);
		}
	} catch (error) {
		console.error("Error in browserFactory:", error);
	}
}
