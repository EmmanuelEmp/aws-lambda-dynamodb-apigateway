import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const dynamo = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamo);
const s3 = new S3Client({});

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const TABLE_NAME = process.env.TABLE_NAME!;
const BUCKET_NAME = process.env.BUCKET_NAME!;

export const handler = async () => {
  const now = Date.now();
  const cutoff = new Date(now - THIRTY_DAYS).toISOString();

  try {
    // Step 1: Scan for items older than 30 days
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "createdAt < :cutoff",
      ExpressionAttributeValues: { ":cutoff": cutoff },
    }));

    const oldItems = result.Items || [];

    if (oldItems.length === 0) {
      console.log("No items to archive.");
      return { statusCode: 200, body: "No items to archive." };
    }

    // Step 2: Archive items to S3
    const fileName = `archived-${new Date().toISOString()}-${uuidv4()}.json`;

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: JSON.stringify(oldItems, null, 2),
      ContentType: "application/json",
    }));

    // Step 3: Delete archived items from DynamoDB
    for (const item of oldItems) {
      await docClient.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { itemId: item.itemId },
      }));
    }

    console.log(`Archived and deleted ${oldItems.length} items.`);
    return {
      statusCode: 200,
      body: `Archived and deleted ${oldItems.length} items.`,
    };
  } catch (error) {
    console.error("Archiving failed:", error);
    return {
      statusCode: 500,
      body: "An error occurred during archiving.",
    };
  }
};
