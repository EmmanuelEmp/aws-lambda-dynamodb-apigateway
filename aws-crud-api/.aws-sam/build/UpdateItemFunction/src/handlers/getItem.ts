import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
  } from "aws-lambda";
  import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
  import {
    DynamoDBDocumentClient,
    GetCommand,
  } from "@aws-sdk/lib-dynamodb";
  
  // Create DynamoDB client
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);
  
  /**
   * Handler to fetch a single item by itemId from the DynamoDB table.
   */
  export const handler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const itemId = event.pathParameters?.itemId;
  
      if (!itemId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Item ID is required in the URL path." }),
        };
      }
  
      const result = await docClient.send(
        new GetCommand({
          TableName: process.env.TABLE_NAME!,
          Key: { itemId },
        })
      );
  
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
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error", error }),
      };
    }
  };
  