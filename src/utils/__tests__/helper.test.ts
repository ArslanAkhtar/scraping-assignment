import { writeFileSync } from "fs";
import { generateCSV, generateHTMLTable } from "../../utils/helper";
import { UserData } from "../../utils/interface";

jest.mock("fs", () => ({
	writeFileSync: jest.fn(),
}));

describe("File Generation Tests", () => {
	const mockUsers: UserData[] = [
		{
			naam: "Doe",
			firstname: "John",
			functienaam: "Developer",
			email: "john.doe@example.com",
			adres: "123 Main St\nSuite 101",
		},
		{
			naam: "Smith",
			firstname: "Jane",
			functienaam: "Manager",
			email: "jane.smith@example.com",
			adres: "456 Second St\nFloor 2",
		},
	];

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should generate a CSV file with the correct content", () => {
		const filePath = "test.csv";
		generateCSV(mockUsers, filePath);

		const expectedCsvContent =
			"naam,firstname,functienaam,email,adres\n" +
			"Doe,John,Developer,john.doe@example.com,123 Main St Suite 101\n" +
			"Smith,Jane,Manager,jane.smith@example.com,456 Second St Floor 2";

		const mockedWriteFileSync = writeFileSync as jest.MockedFunction<
			typeof writeFileSync
		>;

		expect(mockedWriteFileSync).toHaveBeenCalledWith(
			filePath,
			expectedCsvContent,
			"utf8"
		);
	});

	it("should generate an HTML file with the correct content", () => {
		const filePath = "test.html";
		generateHTMLTable(mockUsers, filePath);

		const expectedHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Data Table</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid #dddddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <h2>Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>Naam</th>
              <th>Firstname</th>
              <th>Functienaam</th>
              <th>Email</th>
              <th>Adres</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doe</td>
              <td>John</td>
              <td>Developer</td>
              <td>john.doe@example.com</td>
              <td>123 Main St, Suite 101</td>
            </tr>
            <tr>
              <td>Smith</td>
              <td>Jane</td>
              <td>Manager</td>
              <td>jane.smith@example.com</td>
              <td>456 Second St, Floor 2</td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

		const normalizeHTML = (html: string) => html.replace(/\s+/g, " ").trim();
		const mockedWriteFileSync = writeFileSync as jest.MockedFunction<
			typeof writeFileSync
		>;

		const htmlContent = mockedWriteFileSync.mock.calls[0][1].toString();
	});

	it("should log error if no users data is provided for CSV", () => {
		console.error = jest.fn();
		generateCSV(undefined, "test.csv");
		expect(console.error).toHaveBeenCalledWith("No data to generate CSV");
	});

	it("should log error if no users data is provided for HTML", () => {
		console.error = jest.fn();
		generateHTMLTable(undefined, "test.html");
		expect(console.error).toHaveBeenCalledWith("No data to generate CSV");
	});
});
