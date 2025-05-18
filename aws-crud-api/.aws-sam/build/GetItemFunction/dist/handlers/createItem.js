"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const handler = async (event) => {
    try {
        const { name, description } = JSON.parse(event.body || "{}");
        if (!name || !description) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Name and description are required" }),
            };
        }
        const item = {
            itemId: (0, uuid_1.v4)(),
            name,
            description,
            createdAt: new Date().toISOString(),
        };
        await docClient.send(new lib_dynamodb_1.PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: item,
        }));
        return {
            statusCode: 201,
            body: JSON.stringify(item),
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: err }),
        };
    }
};
exports.handler = handler;
