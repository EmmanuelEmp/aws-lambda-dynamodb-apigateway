# 🕒 Scheduled Data Archiving with AWS Lambda

This project implements an AWS Lambda function that **automatically archives items older than 30 days** from a DynamoDB table to an S3 bucket in JSON format and deletes them from the database. It runs daily using a scheduled CloudWatch Event.

---

## 🚀 Features

- ✅ Archives outdated DynamoDB items into S3 as JSON
- 🗑️ Deletes archived items from DynamoDB
- ⏰ Runs automatically every 24 hours using EventBridge (CloudWatch Events)
- 📦 Fully serverless stack using AWS SAM

---

## Architecture Overview

- **Trigger**: `rate(1 day)` via Amazon EventBridge
- **Lambda Function**: 
  - Scans DynamoDB
  - Archives data to S3
  - Deletes old records
- **Storage**:
  - **DynamoDB Table**: Active items
  - **S3 Bucket**: Archived items
- **IaC**: AWS SAM (`template.yaml`)

---

## ⚙️ Setup and Deployment

### ✅ Prerequisites

- Node.js v18+
- AWS CLI (configured with proper credentials)
- AWS SAM CLI
- Docker (for local testing or packaging)

---

### Clone and Install

```bash
git clone https://github.com/EmmanuelEmp/aws-lambda-dynamodb-apigateway.git

Build and Deploy

cd aws-lambda-dynamodb-apigateway/archive-service
npm install

# Build the project using AWS SAM
npm run package        # or sam build

# Deploy the stack
npm run deploy         # or sam deploy --guided


# During deployment, you will be prompted to:

Choose a stack name

Select an AWS region

Confirm resource creation

Save configuration for future use

# After deployment, the output will include:

Lambda function ARN

DynamoDB table name

S3 archive bucket name
```
# Testing the Archiver Function
Using CloudWatch Logs
Go to AWS Console → CloudWatch → Logs

Find log group for archiveOldItems

View latest log stream to check status:

Items found

Archived to S3

Deleted from DynamoDB

## Verifying S3 Archival

Go to AWS Console → S3 → item-archive-bucket

Open the latest archived-*.json file

Confirm it contains archived item data

## Checking DynamoDB Deletions
Go to AWS Console → DynamoDB → itemTable

Confirm items older than 30 days are no longer present

## Environment Variables
Injected automatically via template.yaml:

# Variable	# Description
TABLE_NAME	 Name of the DynamoDB table
BUCKET_NAME	 Name of the S3 archive bucket

## Assumptions
Items in DynamoDB include a createdAt field in ISO timestamp format

Only items older than 30 days from current time are archived

Lambda function is stateless and idempotent (safe to re-run)

All infrastructure is provisioned using AWS SAM

## Cleanup
To delete all deployed resources:
``` bash
sam delete
```
This will remove the Lambda function, CloudWatch rule, DynamoDB table, and (if empty) the S3 bucket.



## Author
Ochogwu Emmanuel
Backend Developer | Node.js • TypeScript • AWS
GitHub: https://github.com/EmmanuelEmp