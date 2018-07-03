// This is a Javascript test harness that simulates the execution of Lambda function code
// From the command prompt, type "node test.js"

let AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const tempPassPhrase = "long-voice-771";

const MyLambdaFunction = require('./lambda/index.js'); // assumes single Lambda function with exports.handler

 // this is the Lambda request data, generated by the Alexa service.  Replace with your actual Alexa request.
const lookupTest =
    { "queryStringParameters" :
        {
        "tempPassPhrase":tempPassPhrase
        }

    };

const updateTest =
    { "queryStringParameters" :
        {
            "tempPassPhrase":tempPassPhrase
        },
        "body" : {
            "tempPassPhrase":tempPassPhrase,
            "attributes" : {
                "namePronounce": "Lee aaa",
                "country": "PEI"
            }
        }
    };

let context = {
    'succeed': function (data) {
        // console.log(JSON.stringify(data, null,'\t') );
    },
    'fail': function (err) {
        console.log('context.fail occurred');
        console.log(JSON.stringify(err, null,'\t') );
    }
};

function callback(error, data) {
    if(error) {
        console.log('error: ' + error);
    } else {
         // console.log(JSON.stringify(JSON.parse(data.body), null, 2));
    }
}

// call the function
MyLambdaFunction['handler'] (lookupTest, context, callback);