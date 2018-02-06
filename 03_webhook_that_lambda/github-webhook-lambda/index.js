'use strict';

const _ = require('lodash');
const rp = require('request-promise');

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
