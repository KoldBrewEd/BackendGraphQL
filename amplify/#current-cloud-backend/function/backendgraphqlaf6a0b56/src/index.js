/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiBackendGraphQLGraphQLAPIIdOutput = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIIDOUTPUT

Amplify Params - DO NOT EDIT */

let region = process.env.REGION;
let env = require("process").env;
let axios = require("axios");
let AWS = require("aws-sdk");
let urlParse = require("url").URL;
let appsyncUrl = env.AppSyncURL;
let endpoint = new urlParse(appsyncUrl).hostname.toString();

let createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    name
    description
  }
}
`;

AWS.config.update({
  region: env.AWS_REGION,
  credentials: new AWS.Credentials(
    env.AWS_ACCESS_KEY_ID,
    env.AWS_SECRET_ACCESS_KEY,
    env.AWS_SESSION_TOKEN
  )
});

exports.handler = async (event, context) => {
  let req = new AWS.HttpRequest(appsyncUrl, region);
  let todo = {
    input: {
      name: "Lambda Todo",
      description: "Todo Generated from Lambda"
    }
  };
  req.method = "POST";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "multipart/form-data";
  req.body = JSON.stringify({
    query: createTodo,
    operationName: "CreateTodo",
    variables: todo
  });
  let signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  const result = await axios({
    method: "post",
    url: appsyncUrl,
    data: req.body,
    headers: req.headers
  });
  return result.data;
};
