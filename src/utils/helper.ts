import { writeFileSync } from "fs";
import { UserData } from "./interface";

export const generateCSV = (
	users: UserData[] | undefined,
	filePath: string
): void => {
	if (!users) {
		console.error("No data to generate CSV");
		return;
	}
	const csvHeader = "naam,firstname,functienaam,email,adres\n";

	const csvRows = users
		.map(
			(row) =>
				`${row.naam},${row.firstname},${row.functienaam},${
					row.email
				},${row.adres.replace(/\n/g, " ")}`
		)
		.join("\n");

	const csvContent = csvHeader + csvRows;

	writeFileSync(filePath, csvContent, "utf8");

	console.log(`CSV file has been saved to ${filePath}`);
};

export const generateHTMLTable = (
	users: UserData[] | undefined,
	filePath: string
): void => {
	if (!users) {
		console.error("No data to generate CSV");
		return;
	}
	const htmlContent = `
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
          ${users
						.map(
							(row) => `
            <tr>
              <td>${row.naam}</td>
              <td>${row.firstname}</td>
              <td>${row.functienaam}</td>
              <td>${row.email}</td>
              <td>${row.adres.replace(/\n/g, ", ")}</td>
            </tr>
          `
						)
						.join("")}
        </tbody>
      </table>
    </body>
    </html>
  `;

	// Write the HTML content to the specified file
	writeFileSync(filePath, htmlContent, "utf8");

	console.log(`HTML file has been saved to ${filePath}`);
};
