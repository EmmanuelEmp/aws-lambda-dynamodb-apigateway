"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// Create DynamoDB client
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
/**
 * Handler to fetch a single item by itemId from the DynamoDB table.
 */
const handler = async (event) => {
    try {
        const itemId = event.pathParameters?.itemId;
        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Item ID is required in the URL path." }),
            };
        }
        const result = await docClient.send(new lib_dynamodb_1.GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: { itemId },
        }));
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Item not found." }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error }),
        };
    }
};
exports.handler = handler;
