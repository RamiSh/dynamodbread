const AWS = require("aws-sdk"),
    docClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1'
    });

exports.handler = (event) => {
    console.log('inside handler.');
    var table = "octopus-automation-project-requests-dev"; //TODO: Change with your dynamodb tbl name

    var params = {
        TableName: table,
        Key: {
            "Id": "00b28cb0-1255-468b-83e9-86be55cf6f2a" //TODO: change 'id' to your partition key (column name). Change value to your actual lookup value
        }
    };

    console.log('before invoke get.');

   return docClient.get(params)
        .promise() // 'promise' awaits on the async call until it's done
        .then(r => {
            console.log("GetItem succeeded:", JSON.stringify(r, null, 2));
            
            // this returns the response from dynamodb as a http 200 ok response inside the "body" property
            const response = {
                statusCode: 200,
                body: JSON.stringify(r, null, 2), //stringify converts from json to readable text
            };
            return response;

        })
        .catch(err => {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        });
};
