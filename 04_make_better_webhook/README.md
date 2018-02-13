Step 4 Connect to spreadsheet
==============================

The goal in this section is to take the last comment when an issue is closed (found in the last step) and put that into a google spreadsheet.

## Google spread sheet api
- Should be possible to use the [append](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append)


## Create a project on Google APIs
- Go here https://console.developers.google.com/apis/dashboard
- Sign up for an account
- Create a new project
- Enable an API, choose "Google Sheets API"
- `Credentials` on the side bar, `Create Credentials` -> `Service Account Key`
- Give it a name, Role `Project` -> `Editor`, key type `JSON`

## Create a spreadsheet
- Create a new spreadsheet with some columns
- Copy the spreadsheet id which is the long string in the url `https://docs.google.com/spreadsheets/d/<this_long_string_is_your_spreadsheet_id>/edit#gid=0`
- **IMPORTANT** `Share` the document with your project.  Enter the "Service Account ID" (long email looking thing ie `lambda-webhook@eng-empire-194404.iam.gserviceaccount.com`).  Without this your webhook won't have access to the document!

## Write to the spreadsheet
- I did this first as a separate file so I could test locally and separate the spreadsheet part from the lambda part and the github part.
- Use your Service Account credentials and follow the steps for using jwt: https://github.com/google/google-api-nodejs-client/#using-jwt-service-tokens
- [Example stand alone script that updates a spreadsheet](spreadsheet-webhook-lambda/spreadsheet-v4-example.js)
  - Update with your credentials and spreadsheet id and run with `node spreadsheet-v4-example.js`

## Set up environment variables
- Your webhook will need access to your credential json and spreadsheet id.  Rather than hard code them into your webhook you can pass them in as environment variables.
- From the AWS console for your lambda click on the lambda name
- Below the code there is a section for environment variables. Add `spreadsheet_id` and `client_secret`.  When your lambda is executed these will be available under `process.env.spreadsheet_id` and `process.env.client_secret`
  - Don't forget to `JSON.parse(process.env.client_secret)`

## Combine spreadsheet and webhook
- Now on one hand you have made a lambda, added a REST interface to it (API Gateway in AWS speak), made it act like a github webhook.  On the other hand you have a script that will update a google spreadsheet.  The only thing that's left is to [stick the two together](https://res.cloudinary.com/cmgverticals/image/upload/f_auto,q_80/h_221,w_400/v1486346797/Stuck_lwni0h.gif).
- I've also made a stand alone [tester](spreadsheet-webhook-lambda/test-index.js) in case you want to trouble shoot your lambda outside of AWS
- [Example completed lambda-spreadsheet-webhook](spreadsheet-webhook-lambda/index.js)


# Congratulations
You have finished and created a useful thing.
![](https://i.imgflip.com/24gqed.jpg)
