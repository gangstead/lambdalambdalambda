'use strict';
// Test your webhook from the command line.
// Update client_secret and spreadsheet_id lines here
// Run with `node test-index.js`
// You should get a new line in your spreadsheet: `testing my webhook	made another comment after reopening.	2018-02-06T03:44:40Z	https://api.github.com/repos/gangstead/lambdalambdalambda/issues/1`


process.env.client_secret = `{ paste your client secret json here and replace all \n with \\n}`;
process.env.spreadsheet_id = '1R-4dMqbToqUwECR6ryXusaL_cFV6XzpFm0nKiWIaUQs'

// Sample event json.  You can also paste this as a test event in the lambda console to test your lambda in production
const event = {
  "body": "{\"action\":\"closed\",\"issue\":{\"url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues/1\",\"repository_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda\",\"labels_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues/1/labels{/name}\",\"comments_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues/1/comments\",\"events_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues/1/events\",\"html_url\":\"https://github.com/gangstead/lambdalambdalambda/issues/1\",\"id\":294619714,\"number\":1,\"title\":\"testing my webhook\",\"user\":{\"login\":\"gangstead\",\"id\":527760,\"avatar_url\":\"https://avatars3.githubusercontent.com/u/527760?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/gangstead\",\"html_url\":\"https://github.com/gangstead\",\"followers_url\":\"https://api.github.com/users/gangstead/followers\",\"following_url\":\"https://api.github.com/users/gangstead/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/gangstead/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/gangstead/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/gangstead/subscriptions\",\"organizations_url\":\"https://api.github.com/users/gangstead/orgs\",\"repos_url\":\"https://api.github.com/users/gangstead/repos\",\"events_url\":\"https://api.github.com/users/gangstead/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/gangstead/received_events\",\"type\":\"User\",\"site_admin\":false},\"labels\":[],\"state\":\"closed\",\"locked\":false,\"assignee\":null,\"assignees\":[],\"milestone\":null,\"comments\":1,\"created_at\":\"2018-02-06T03:23:42Z\",\"updated_at\":\"2018-02-06T03:44:41Z\",\"closed_at\":\"2018-02-06T03:44:40Z\",\"author_association\":\"OWNER\",\"body\":\"\"},\"repository\":{\"id\":120393018,\"name\":\"lambdalambdalambda\",\"full_name\":\"gangstead/lambdalambdalambda\",\"owner\":{\"login\":\"gangstead\",\"id\":527760,\"avatar_url\":\"https://avatars3.githubusercontent.com/u/527760?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/gangstead\",\"html_url\":\"https://github.com/gangstead\",\"followers_url\":\"https://api.github.com/users/gangstead/followers\",\"following_url\":\"https://api.github.com/users/gangstead/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/gangstead/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/gangstead/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/gangstead/subscriptions\",\"organizations_url\":\"https://api.github.com/users/gangstead/orgs\",\"repos_url\":\"https://api.github.com/users/gangstead/repos\",\"events_url\":\"https://api.github.com/users/gangstead/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/gangstead/received_events\",\"type\":\"User\",\"site_admin\":false},\"private\":false,\"html_url\":\"https://github.com/gangstead/lambdalambdalambda\",\"description\":\"Workshop for NodeschoolDal meetup\",\"fork\":false,\"url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda\",\"forks_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/forks\",\"keys_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/keys{/key_id}\",\"collaborators_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/collaborators{/collaborator}\",\"teams_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/teams\",\"hooks_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/hooks\",\"issue_events_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues/events{/number}\",\"events_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/events\",\"assignees_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/assignees{/user}\",\"branches_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/branches{/branch}\",\"tags_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/tags\",\"blobs_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/git/blobs{/sha}\",\"git_tags_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/git/tags{/sha}\",\"git_refs_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/git/refs{/sha}\",\"trees_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/git/trees{/sha}\",\"statuses_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/statuses/{sha}\",\"languages_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/languages\",\"stargazers_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/stargazers\",\"contributors_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/contributors\",\"subscribers_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/subscribers\",\"subscription_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/subscription\",\"commits_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/commits{/sha}\",\"git_commits_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/git/commits{/sha}\",\"comments_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/comments{/number}\",\"issue_comment_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues/comments{/number}\",\"contents_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/contents/{+path}\",\"compare_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/compare/{base}...{head}\",\"merges_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/merges\",\"archive_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/{archive_format}{/ref}\",\"downloads_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/downloads\",\"issues_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/issues{/number}\",\"pulls_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/pulls{/number}\",\"milestones_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/milestones{/number}\",\"notifications_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/notifications{?since,all,participating}\",\"labels_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/labels{/name}\",\"releases_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/releases{/id}\",\"deployments_url\":\"https://api.github.com/repos/gangstead/lambdalambdalambda/deployments\",\"created_at\":\"2018-02-06T02:52:55Z\",\"updated_at\":\"2018-02-06T02:54:59Z\",\"pushed_at\":\"2018-02-06T02:54:58Z\",\"git_url\":\"git://github.com/gangstead/lambdalambdalambda.git\",\"ssh_url\":\"git@github.com:gangstead/lambdalambdalambda.git\",\"clone_url\":\"https://github.com/gangstead/lambdalambdalambda.git\",\"svn_url\":\"https://github.com/gangstead/lambdalambdalambda\",\"homepage\":null,\"size\":0,\"stargazers_count\":0,\"watchers_count\":0,\"language\":\"JavaScript\",\"has_issues\":true,\"has_projects\":true,\"has_downloads\":true,\"has_wiki\":true,\"has_pages\":false,\"forks_count\":0,\"mirror_url\":null,\"archived\":false,\"open_issues_count\":0,\"license\":null,\"forks\":0,\"open_issues\":0,\"watchers\":0,\"default_branch\":\"master\"},\"sender\":{\"login\":\"gangstead\",\"id\":527760,\"avatar_url\":\"https://avatars3.githubusercontent.com/u/527760?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/gangstead\",\"html_url\":\"https://github.com/gangstead\",\"followers_url\":\"https://api.github.com/users/gangstead/followers\",\"following_url\":\"https://api.github.com/users/gangstead/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/gangstead/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/gangstead/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/gangstead/subscriptions\",\"organizations_url\":\"https://api.github.com/users/gangstead/orgs\",\"repos_url\":\"https://api.github.com/users/gangstead/repos\",\"events_url\":\"https://api.github.com/users/gangstead/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/gangstead/received_events\",\"type\":\"User\",\"site_admin\":false}}",
  "resource": "/{proxy+}",
  "requestContext": {
    "resourceId": "123456",
    "apiId": "1234567890",
    "resourcePath": "/{proxy+}",
    "httpMethod": "POST",
    "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
    "accountId": "123456789012",
    "identity": {
      "apiKey": null,
      "userArn": null,
      "cognitoAuthenticationType": null,
      "caller": null,
      "userAgent": "Custom User Agent String",
      "user": null,
      "cognitoIdentityPoolId": null,
      "cognitoIdentityId": null,
      "cognitoAuthenticationProvider": null,
      "sourceIp": "127.0.0.1",
      "accountId": null
    },
    "stage": "prod"
  },
  "queryStringParameters": {
    "foo": "bar"
  },
  "headers": {
    "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
    "Accept-Language": "en-US,en;q=0.8",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Mobile-Viewer": "false",
    "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
    "CloudFront-Viewer-Country": "US",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Upgrade-Insecure-Requests": "1",
    "X-Forwarded-Port": "443",
    "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
    "X-Forwarded-Proto": "https",
    "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
    "CloudFront-Is-Tablet-Viewer": "false",
    "Cache-Control": "max-age=0",
    "User-Agent": "Custom User Agent String",
    "CloudFront-Forwarded-Proto": "https",
    "Accept-Encoding": "gzip, deflate, sdch"
  },
  "pathParameters": {
    "proxy": "path/to/resource"
  },
  "httpMethod": "POST",
  "stageVariables": {
    "baz": "qux"
  },
  "path": "/path/to/resource"
};

const lambda = require('./index').handler;

lambda(event, {}, (err, result) => {
  if (err) {
    console.error('You still have some work to do.', err);
  }
  console.log('Lambda completed successfully with result:', result);
})
