require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package
const { google } = require("googleapis");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
// process.env.PORT
//This allows us to parse the incoming request body as JSON

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(cors());

// With this, we'll listen for the server on port 8080
app.listen(port, () =>
  console.log(`Server running at http://${host}:${port}/api`)
);

async function authSheets() {
  //Function for authentication object
  const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  //Create client instance for auth
  const authClient = await auth.getClient();

  //Instance of the Sheets API
  const sheets = google.sheets({ version: "v4", auth: authClient });

  return {
    auth,
    authClient,
    sheets,
  };
}

app.get("/api", async (req, res) => {
  const { sheets } = await authSheets();

  // Read rows from spreadsheet
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: "1W2zM3dAoI4NV4OP03AoPlF1xx6seHYREuljTVfNv3NY",
    range: "Sheet1",
  });

  res.json(getRows.data);
});
