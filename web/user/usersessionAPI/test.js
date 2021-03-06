// This is a Javascript test harness that simulates the execution of Lambda function code
// From the command prompt, type "node test.js"
const fs = require("fs");

let AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const tempPassPhrase = "sweet-dog-721";

const MyLambdaFunction = require('./lambda/index.js'); // assumes single Lambda function with exports.handler


const myFileName =  `./lambda/helloworld.mp3`; // `${__dirname}/helloworld.mp3`;

const myFile = fs.readFileSync(myFileName);
const myFile64 = myFile.toString('base64');

 // this is the Lambda request data, generated by the Alexa service.  Replace with your actual Alexa request.
const lookupTest =
    { "queryStringParameters" :
        {"tempPassPhrase":tempPassPhrase},
        "path":"/lookup",
    };

const updateTest =
    { "queryStringParameters" :
        {
            "tempPassPhrase":tempPassPhrase
        },
        "path":"/update",
        "body" : {
            "attributes" : {
                "namePronounce": "Leah DIA 1226"
            }
        }
    };

const updateTestMp3 =
    { "queryStringParameters" :
        {
            "tempPassPhrase":tempPassPhrase,
            "mp3upload": "true"
        },
        "path":"/update",
        "body" : {
            "attributes" : {
                "audioClip": "new"
            },
            "file": myFile64
        }
    };

let context = {
    'succeed': function (data) {
        console.log(JSON.stringify(data, null,'\t') );
        console.log('context.succeed');
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
        // result = JSON.parse(data.body);
        // data = data.body.attributes.audioClip;
        console.log('callback');
        console.log(JSON.stringify(data, null,2) );

    }
}

// call the function
MyLambdaFunction['handler'] (lookupTest, context, callback);
