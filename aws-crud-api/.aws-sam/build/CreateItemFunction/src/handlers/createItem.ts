import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { name, description } = JSON.parse(event.body || "{}");

    if (!name || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name and description are required" }),
      };
    }

    const item = {
      itemId: uuidv4(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME!,
        Item: item,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: err }),
    };
  }
};
