'use strict';

const _ = require('lodash');
const rp = require('request-promise');
const {google} = require('googleapis');
const sheets = google.sheets('v4');

const clientSecret = JSON.parse(process.env.client_secret);
const spreadsheetId = process.env.spreadsheet_id;

exports.handler = (event, context, callback) => {
    // Find this log in cloudwatch https://console.aws.amazon.com/cloudwatch/home
    const body = JSON.parse(event.body);
    console.log(`Received payload: ${JSON.stringify(body)}`);

    if (body.issue && body.action === 'closed'){
      return rp({
          uri: body.issue.comments_url,
          headers: {
              'User-Agent': 'Lambda-Workshop'
          },
          json: true // Automatically parses the JSON string in the response
      }).then((comments) => {
        const lastComment = _.get(_.last(comments), 'body', 'no comment made');
        console.log('Last Comment: ', lastComment);
        return addToSheet(
          // these match the columns in the spreadsheet
          [ body.issue.title, lastComment, body.issue.closed_at, body.issue.url ]
        );
      }).then(() => {
        return callback(null, {
          isBase64Encoded: false,
          statusCode: 200,
          body: JSON.stringify({
            action: 'spreadsheet updated'
          })
        });
      })
      .catch((err) => {
        console.log('ruh roh.  Github says: ', err);
        callback(null, {
          isBase64Encoded: false,
          statusCode: 500,
          body: JSON.stringify({
            action: 'i messed up'
          })
        });
      });
    }

    callback(null, {
      isBase64Encoded: false,
      statusCode: 200,
      body: JSON.stringify({
        action: 'i did nothing'
      })
    });
};

function addToSheet(row) {
  return new Promise((resolve, reject) => {
    console.log('clientSecret', clientSecret);
    const jwtClient = new google.auth.JWT(
      clientSecret.client_email, // Make sure spreadsheet is shared with this email!
      null,
      clientSecret.private_key,
      ['https://www.googleapis.com/auth/spreadsheets'],
      null
    );

    jwtClient.authorize((authErr, tokens) => {
      if (authErr) {
        console.log('authorize err:', authErr);
        return reject(authErr);
      }

      sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: 'Sheet1!A:D',
        valueInputOption:'RAW',
        resource: {
          majorDimension: 'ROWS',
          values: [ row ]
        }
      }, (appendErr, response) => {
        if (appendErr) {
          console.log('The API returned an error: ' + err);
          return reject(appendErr);
        }
        console.log('Row added to spreadsheet successfully!');
        return resolve();
      });
    });
  })
}
