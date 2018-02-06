Step 2 Create-a-Lambda
=======================

Now that you've set up your AWS account and can create lambdas it's time to create one.  The webhook code has been started, *but not completed*, for you in the `/webhook-lambda` directory.

# Prepare the files on your machine
- In the `/webhook-lambda` directory...
- `npm install` to install dependencies
- Take a look at the initial state of the [webhook](webhook-lambda/index.js)  *All this does is reply back successfully to an API Gateway*.  It unnecessarily relies on a dependency so you can see how to include dependencies in a lambda by zipping up your `node_modules` directory.
- zip up the contents of the directory including `node_modules` into `webhook-lambda.zip`
  - `zip -r ../webhook-lambda.zip  *`
  - Make sure the files are in the root level of the zip and not one level deep.  Otherwise you will get errors like "Cannot find module '/var/task/index'"
  - AWS calls this a "Deployment Package."  It has all the files and dependencies necessary, but tells nothing about where or how to deploy the Lambda

# Create lambda

### Option 1 through the AWS Console (web interface)
- Go to [Lambda](https://console.aws.amazon.com/lambda/home) home page and "Create a Function"
  - Give it a name and choose Node.js 6.10
  - For Role either "Create a Custom Role" and accept the defaults in the window that pops up or head over to [IAM](https://console.aws.amazon.com/iam/home) and create a new role with the Trusted Entity "Lambda" and the policy "AWSLambdaBasicExecutionRole".
  - Click "Create Function"
- Under the "Function Code" setup block select "Code entry type" then "Upload a .ZIP file" and upload your code.
- The function is created but it's not ready yet. On the next page add "API Gateway" trigger
- Leave API name and Deployment stage the default value, change "Security" to "Open".  Click "Add"
- In the "Function code" section (you might have to save function and possibly reload page to get it to show up) change Code entry type to "Upload a .ZIP file" and upload the file with the lambda.  Save.
- On the API Gateway settings you will see that it is listening for any method (GET/POST/PUT/etc) and the Invoke URL is the path to get to your webhook.  Test it by hitting it directly:
```
curl -X POST -H \ "Content-Type: application/json" -d '{ "data": "hello" }' "https://uco290nvi0.execute-api.us-east-1.amazonaws.com/prod/webhook-lambda"

### Option 2 through the CLI
_This is a work in progress_
```
aws lambda create-function \
 --function-name webhook \
 --runtime nodejs6.10 \
 --role arn:aws:iam::005155365294:role/webhooklambdarole \
 --handler index.handler \
 --description "A webhook run in a lambda" \
 --publish \
 --zip-file fileb://<path-to-your-zip>/webhook-lambda.zip \
```
- `role` is a role you've created from [IAM](https://console.aws.amazon.com/iam/home) with the Trusted Entity "Lambda" and the policy "AWSLambdaBasicExecutionRole".  Copy the "Role ARN"
- You should now see the new Lambda on your list

### Make REST API out of lambda
#TODO: This can be done with the CLI, but I'm not sure how
