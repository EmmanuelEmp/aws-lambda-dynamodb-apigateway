"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
/**
 * Updates the name and description of an existing item in DynamoDB.
 */
const handler = async (event) => {
    try {
        const itemId = event.pathParameters?.itemId;
        const { name, description } = JSON.parse(event.body || "{}");
        if (!itemId || !name || !description) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "itemId, name, and description are required." }),
            };
        }
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: { itemId },
            UpdateExpression: "set #name = :name, #description = :description",
            ExpressionAttributeNames: {
                "#name": "name",
                "#description": "description",
            },
            ExpressionAttributeValues: {
                ":name": name,
                ":description": description,
            },
            ReturnValues: "ALL_NEW",
        });
        const result = await docClient.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Item updated successfully.",
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
