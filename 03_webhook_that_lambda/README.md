Step 3 Make lambda serve as a github webhook
============================================

You've now got a lambda that responds to http requests.  It's time to send those requests to github.

### Stick a Fork in it
- Go to this repo (or any repo for that matter) https://github.com/gangstead/lambdalambdalambda
- Make a fork (top right corner) to create your own copy of the repo

### Hook it up
- Once you have your fork click on `⚙️ Settings` -> `Webhooks` -> `Add webhook` (re-enter your github password)
- For Payload URL enter your Lambda Invoke URL
- Change content type to `application/json`
- Select "Let me select individual events" select `Issues` and unselect `Push` then `Add webhook` to save it
- Github will immediately POST a message to your webhook.  You can see it on the details for that webhook under "Recent Deliveries".  There you can see the the payload github sent and the response it received.

### Make webhook useful
- The goal in this section is to find the last comment when an issue is closed
- On your repo create an issue, add a comment, and close it
- Go back to your "Recent Deliveries" for your webhook and look at the payloads
- The requests have links to everything you need to find out about the issue.  Follow those links to get the information you want
  - Hint: use the built in [http.request(...)](https://nodejs.org/api/http.html#http_http_request_options_callback)
  - Or use the [request](https://www.npmjs.com/package/request) Package
  - Or use one of the many promise wrappers for `request` like [request-promise](https://github.com/request/request-promise)
- Providing links to navigate an API like this is a pattern called [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)
- You will have to zip up your webhook folder and upload it multiple times
- Example code in [github-webhook-lambda](github-webhook-lambda/)
