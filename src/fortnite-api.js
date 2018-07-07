require('dotenv/config');
const AWS = require('aws-sdk');
const request = require('request-promise');
AWS.config.update({region: 'us-east-1'});

exports.handler = (event, context) => {
    console.log('starting request');
    let promises = [];
    var options = {
        url: 'https://api.fortnitetracker.com/v1/profile/pc/KlavisVerge',
        headers: {
            'TRN-Api-Key': 'xxx'
        }
    };
    promises.push(request(options).promise().then((error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log('Success: ' + JSON.stringify(info));
        } else {
            console.log('Error: ' + JSON.stringify(info));
        }
    }));

    return Promise.all(promises).then(() => {
        console.log('returning');
        return context.succeed({
            statusCode: 200,
            body: 'hi',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,XAmz-Security-Token',
                'Access-Control-Allow-Origin': '*'
            }
        });
    });
}