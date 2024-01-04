
export default async function handler(req, res) {
    const spreadsheetId = process.env.SPREADSHEET_ID; // Mathew SpreadSheet ID
    // const spreadsheetId = "1xGyWfPLPnys5YWSkJ4UJJw-Q8iCVfl4z-de_mmQHCAQ";
    const sheetId = "Sheet1!A:L"; // Change range once new column for answer choice is added
    const key = process.env.GOOGLE_SHEETS_KEY; // Mathew API Key
    // const key = "AIzaSyBpVHsMtN7concf0VgTeZGVRlTOhjd5taE";
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId}?key=${key}`;

    if (req.method === 'GET') {
        try {
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    Host: "sheets.googleapis.com",
                    "Content-Type": "application/json",
                },
            });
            const sheet = await response.json();

            const questions = [];
        
            for (let i = 1; i < sheet.values.length; i++) {
                const questionObj = {
                SubCatNum: sheet.values[i][0],
                Category: sheet.values[i][1],
                Subcategory: sheet.values[i][2],
                Question: sheet.values[i][3],
                A: sheet.values[i][4],
                B: sheet.values[i][5],
                C: sheet.values[i][6],
                D: sheet.values[i][7],
                E: sheet.values[i][8], //increase below array access numbers by one
                Answer: sheet.values[i][9],
                Explained: sheet.values[i][10],
                Picture: sheet.values[i][11],
                Flag: false,
                };
                questions.push(questionObj);
            }
        
            res.status(200).json({ questions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
  }
  