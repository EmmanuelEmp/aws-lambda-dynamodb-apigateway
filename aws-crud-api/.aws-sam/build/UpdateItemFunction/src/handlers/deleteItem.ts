import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
  import {
    DynamoDBDocumentClient,
    DeleteCommand,
  } from "@aws-sdk/lib-dynamodb";
  
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  
  /**
   * Deletes an item by ID from DynamoDB.
   */
  export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const itemId = event.pathParameters?.itemId;
  
      if (!itemId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "itemId is required in the path." }),
        };
      }
  
      const command = new DeleteCommand({
        TableName: process.env.TABLE_NAME!,
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
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error", error }),
      };
    }
  };
  