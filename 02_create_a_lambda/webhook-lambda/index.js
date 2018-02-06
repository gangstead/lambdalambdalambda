'use strict';

const _ = require('lodash');

exports.handler = (event, context, callback) => {
    // Find this log in cloudwatch https://console.aws.amazon.com/cloudwatch/home
    console.log(`Lambda: ${_.get(event, 'requestContext.path')}\t Logging to cloudwatch: ${JSON.stringify(event)}`);
    callback(null, {
      isBase64Encoded: false,
      statusCode: 200,
      body: JSON.stringify({
        hello: "yourself"
      })
    });
};
