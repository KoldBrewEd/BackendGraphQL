/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiBackendGraphQLGraphQLAPIIdOutput = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIIDOUTPUT
var apiBackendGraphQLGraphQLAPIEndpointOutput = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

let env = require("process").env;
let https = require("https");
let AWS = require("aws-sdk");
let urlParse = require("url").URL;
let appsyncUrl = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT; //'https://xxx.appsync-api.us-east-1.amazonaws.com/graphql'
let region = process.env.REGION; //'us-east-1'
let endpoint = new urlParse(appsyncUrl).hostname.toString();
let graphqlQuery = require("./query.js").mutation;

AWS.config.update({
  region: region,
  credentials: new AWS.Credentials(
    env.AWS_ACCESS_KEY_ID,
    env.AWS_SECRET_ACCESS_KEY,
    env.AWS_SESSION_TOKEN
  )
});

exports.handler = async event => {
  console.log(event);
  let req = new AWS.HttpRequest(appsyncUrl, region);

  let item = {
    input: event
  };

  req.method = "POST";
  req.host = endpoint;
  req.headers.host = endpoint;
  //req.headers["x-api-key"] = "xxxxxxxxxxa";
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: "CreateTodo",
    variables: item
  });
  let signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  const data = await new Promise((resolve, reject) => {
    const request = https.request(req, result => {
      result.on("data", data => {
        resolve(JSON.parse(data.toString()));
      });
    });

    request.write(req.body);
    request.end();
  });
  return {
    statusCode: 200,
    body: data
  };
};
