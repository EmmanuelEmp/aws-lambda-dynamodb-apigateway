"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
/**
 * Deletes an item by ID from DynamoDB.
 */
const handler = async (event) => {
    try {
        const itemId = event.pathParameters?.itemId;
        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "itemId is required in the path." }),
            };
        }
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: { itemId },
            ReturnValues: "ALL_OLD",
        });
        const result = await docClient.send(command);
        if (!result.Attributes) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Item not found." }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Item deleted successfully.",
                item: result.Attributes,
            }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error", error }),
        };
    }
};
exports.handler = handler;
