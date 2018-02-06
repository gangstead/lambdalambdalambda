'use strict';

const _ = require('lodash');
const rp = require('request-promise');
const google = require('googleapis');
const sheets = google.sheets('v4');

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
        googleAuthorize(readSheet) //TODO: move the callback into here after the sheet is read and updated
        return callback(null, {
          isBase64Encoded: false,
          statusCode: 200,
          body: JSON.stringify({
            action: 'found comment',
            lastComment
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

function readSheet(authClient) {
  var request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'my-range',  // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: '',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: '',  // TODO: Update placeholder value.

    auth: authClient,
  };

  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
});

function googleAuthorize(callback) {
  // TODO: Change placeholder below to generate authentication credentials. See
  // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //
  // Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var authClient = null;

  if (authClient == null) {
    console.log('authentication failed');
    return;
  }
  callback(authClient);
}
