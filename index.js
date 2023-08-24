require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
const port = process.env.PORT || "3000";
const host = process.env.HOST || "127.0.0.1";

// Middleware
app.use(cors()); // Add CORS middleware here
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route for API
app.get("/api", async (req, res) => {
  app.use(cors()); // Add CORS middleware here
  try {
    const { sheets } = await authSheets();
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: "1W2zM3dAoI4NV4OP03AoPlF1xx6seHYREuljTVfNv3NY",
      range: "Sheet1!A:K",
    });

    res.json(getRows.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Start the server
app.listen(port, () => console.log(`Server running at http://${host}:${port}`));

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
