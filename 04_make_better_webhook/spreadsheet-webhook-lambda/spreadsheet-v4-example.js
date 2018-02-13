'use strict';
// Uses Google Spreadsheet api v4.  Not a webhook, just adds a row to a spreadsheet.

// Your Service Account key json downloaded when you created the credential
const key = require('/Users/gangstead/Downloads/My Project-7af06adba49b.json');

// Look in the url for the spreadsheet to get this id.
const spreadsheetId = '1R-4dMqbToqUwECR6ryXusaL_cFV6XzpFm0nKiWIaUQs';

const {google} = require('googleapis');
const sheets = google.sheets('v4');

const jwtClient = new google.auth.JWT(
  key.client_email, // Make sure spreadsheet is shared with this email!
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
  null
);

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log('authorize err:', err);
    return;
  }

  sheets.spreadsheets.values.append({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: 'Sheet1!A:D',
    valueInputOption:'RAW',
    resource: {
      majorDimension: 'ROWS',
      values: [
        [
          'how',
          'didi',
          'getin',
          'thismess'
        ]
      ]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('Row added to spreadsheet successfully!');
  });
});
