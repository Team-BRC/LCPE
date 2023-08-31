const spreadsheetId = "1W2zM3dAoI4NV4OP03AoPlF1xx6seHYREuljTVfNv3NY";
const sheetId = "Sheet1!A:K";
const key = "4c2866d904cf2de5bc9b7399c9c286db15ffabb4";
var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId}?key=${key}`;

async function googleSheets() {
  var response = await fetch(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      Host: "sheets.googleapis.com",
    },
  });
  console.log(response);
}

export default googleSheets;
