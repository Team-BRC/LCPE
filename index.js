import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

function getValues(spreadsheetId, range, callback) {
  try {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then((response) => {
        const result = response.result;
        const numRows = result.values ? result.values.length : 0;
        console.log(`${numRows} rows retrieved.`);
        if (callback) callback(response);
      });
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }
}
