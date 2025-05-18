import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
  import {
    DynamoDBDocumentClient,
    UpdateCommand,
  } from "@aws-sdk/lib-dynamodb";
  
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  
  /**
   * Updates the name and description of an existing item in DynamoDB.
   */
  export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const itemId = event.pathParameters?.itemId;
      const { name, description } = JSON.parse(event.body || "{}");
  
      if (!itemId || !name || !description) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "itemId, name, and description are required." }),
        };
      }
  
      const command = new UpdateCommand({
        TableName: process.env.TABLE_NAME!,
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
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error", error }),
      };
    }
  };
  