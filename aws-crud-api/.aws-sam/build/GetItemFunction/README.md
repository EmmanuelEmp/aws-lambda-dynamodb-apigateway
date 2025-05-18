# 📦 AWS Serverless CRUD API with DynamoDB

This project is a fully serverless REST API built using **AWS SAM**, **TypeScript**, and **DynamoDB**. It allows users to perform **CRUD operations** — create, retrieve, update, and delete items — via RESTful HTTP endpoints exposed through **API Gateway**.

---

## 🔧 Tech Stack

- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- TypeScript
- AWS SDK v3

---

## 📌 Assignment Requirements

### ✅ 1. Setup

- Each CRUD operation is implemented as a **separate AWS Lambda function**.
- **API Gateway** exposes the Lambda functions as RESTful HTTP endpoints.
- **DynamoDB** stores the data using the following schema:
  - `itemId` (UUID, primary key)
  - `name` (string)
  - `description` (string)
  - `createdAt` (ISO timestamp)

### ✅ 2. API Specifications

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| POST   | `/items`             | Create a new item                  |
| GET    | `/items/{itemId}`    | Retrieve an item by ID             |
| PUT    | `/items/{itemId}`    | Update an item’s name & description |
| DELETE | `/items/{itemId}`    | Delete an item by ID               |

---

## 📁 Project Structure

```plaintext
aws-crud-api/
├── src/
│   └── handlers/
│       ├── createItem.ts      # POST /items
│       ├── getItem.ts         # GET /items/{itemId}
│       ├── updateItem.ts      # PUT /items/{itemId}
│       └── deleteItem.ts      # DELETE /items/{itemId}
├── template.yaml              # AWS SAM infrastructure definition
├── tsconfig.json              # TypeScript compiler config
├── package.json               # Dependencies
└── README.md                  # Project documentation

⚙️ Setup & Installation
Prerequisites
Node.js 18+

Docker (for local testing with SAM)

AWS CLI

AWS SAM CLI

An AWS account with IAM access

Installation Steps

Install dependencies
npm install

Build the project
sam build

Deploy to AWS
sam deploy --guided
Follow the prompts to:

Choose a stack name

Select your AWS region (e.g., us-east-1)

Confirm resource creation

Save the config to samconfig.toml

After deployment, copy the ApiUrl from the output to test your endpoints.

🧪 API Testing
✅ Create Item

curl -X POST https://{api-url}/Prod/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Interview Task", "description": "Complete before deadline"}'
🔍 Get Item

curl https://{api-url}/Prod/items/{itemId}

✏️ Update Item
curl -X PUT https://{api-url}/Prod/items/{itemId} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Task", "description": "Updated details"}'
❌ Delete Item

curl -X DELETE https://{api-url}/Prod/items/{itemId}
⚠️ Error Handling
Each Lambda function includes:
400 Bad Request: for missing or invalid input fields
404 Not Found: when an item doesn’t exist
500 Internal Server Error: for unexpected failures
All responses are returned in consistent and clean JSON format for easy debugging and integration.

🧠 Assumptions
Items are uniquely identified using a generated UUID (itemId)
Items contain name, description, and createdAt timestamp
DynamoDB uses PAY_PER_REQUEST billing mode
API Gateway directly exposes each Lambda function
No authentication is applied (public endpoints)
Input validation is handled in each Lambda function

👨‍💻 Author
Ochogwu Emmanuel
Backend Developer • Node.js • TypeScript • AWS