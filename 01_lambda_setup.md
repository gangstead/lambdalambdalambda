Step 1 - Lambda setup
=====================
- Following [these instructions](https://docs.aws.amazon.com/lambda/latest/dg/setup.html)
  - *Set Up an AWS Account*
    - Even if you already have one, you'll need to set up an IAM user
    - You will need a phone number that will be validated and a credit card, but it won't be charged
    - After creating the account when you create the user you will sign in with the email address used to create the account, not the user name.  Then you can create the IAM user
  - *Set Up the AWS CLI*
    - The instructions give you two options: `pip` (Python installer) or [Standalone Installer](https://docs.aws.amazon.com/cli/latest/userguide/awscli-install-bundle.html).  If you don't already have pip installed save yourself the time dealing with Python versions and do the Standalone.
    - Make sure to do both the Set Up and *Configuring the AWS Command Line Interface* parts of setup
    - There is a verify step that has you run `aws lambda list-functions --profile adminuser` but that didn't work for me on a new account
  - OPTIONAL: *Create a Simple Lambda*
    - This is a basic walk through of creating a Hello World lambda from their blue prints in the AWS GUI.  We are going to create our lambda from the command line.

# Congratulations you have set up AWS lambda.
[Claim your reward here](https://i.pinimg.com/originals/35/22/9f/35229fe2940b5a251400b63fc280ed85.gif)

Then [proceed to step 2](02_create_a_lambda.md)
