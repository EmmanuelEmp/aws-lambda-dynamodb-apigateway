# AWS Serverless CRUD API with DynamoDB

A fully serverless RESTful API built using **AWS Lambda**, **API Gateway**, **DynamoDB**, and **AWS SAM** with **TypeScript**. This project implements complete CRUD operations—Create, Read, Update, and Delete—on items stored in a DynamoDB table.

---

## **Features**

- Separate Lambda functions for each CRUD operation  
- RESTful API exposed via Amazon API Gateway  
- DynamoDB table with the following fields: `itemId`, `name`, `description`, and `createdAt`  
- Consistent JSON responses with structured error handling  
- Infrastructure managed entirely through AWS SAM templates  

---

## **Technology Stack**

- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)  
- AWS Lambda (Node.js 18.x)  
- Amazon API Gateway  
- Amazon DynamoDB  
- TypeScript  
- AWS SDK v3  

---

## **Assignment Requirements Overview**

### **Setup**

- Each CRUD operation is implemented as a distinct Lambda function  
- API Gateway routes REST endpoints to the corresponding Lambda function  
- DynamoDB table schema includes:  
  - `itemId` (string, UUID, primary key)  
  - `name` (string)  
  - `description` (string)  
  - `createdAt` (ISO timestamp string)  

### **API Endpoints**

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/items`              | Create a new item            |
| GET    | `/items/{itemId}`     | Retrieve an item by ID       |
| PUT    | `/items/{itemId}`     | Update an item's name and description |
| DELETE | `/items/{itemId}`     | Delete an item by ID         |

---

## **Project Structure**

```plaintext
aws-crud-api/
├── src/
│   └── handlers/
│       ├── createItem.ts       # POST /items
│       ├── getItem.ts          # GET /items/{itemId}
│       ├── updateItem.ts       # PUT /items/{itemId}
│       └── deleteItem.ts       # DELETE /items/{itemId}
├── template.yaml               # AWS SAM template
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # Project documentation

```

## Setup and Deployment

# Prerequisites
Node.js v18 or higher
Docker (for local SAM testing)
AWS CLI configured with an IAM user with deployment permissions
AWS SAM CLI
AWS account

## Installation
```bash
Install project dependencies
npm install

Build the project with AWS SAM
npm run package or sam build

Deploy to AWS
npm run deploy or deploy --guided

Follow prompts to specify:
Stack name
AWS region (e.g., us-east-1)
Confirm resource creation
Save configuration for future deployments
After deployment, note the API URL output to test your endpoints.
```

## API Testing (using curl)

# Create Item
curl -X POST https://{api-url}/Prod/items \
  -H "Content-Type: application/json" \
  -d '{"name": "task 1", "description": "Complete before deadline"}'

# Get Item
curl https://{api-url}/Prod/items/{itemId}

# Update Item
curl -X PUT https://{api-url}/Prod/items/{itemId} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Task", "description": "Updated details"}'

# Delete Item
curl -X DELETE https://{api-url}/Prod/items/{itemId}

## Postman Collection
A Postman collection is provided to facilitate testing of all API endpoints. Import the file aws-crud-api.postman_collection.json into Postman.

Set the baseUrl environment variable in Postman to your deployed API URL (e.g., https://abc123.execute-api.us-east-1.amazonaws.com/Prod).

This allows all endpoints in the collection to use this base URL.

## Error Handling
Each Lambda function implements clear and consistent error responses:
400 Bad Request: Invalid or missing input data
404 Not Found: Item does not exist
500 Internal Server Error: Unexpected errors
All responses are returned in JSON format to simplify debugging and integration.

## Assumptions
- itemId is generated server-side as a UUID v4 to ensure uniqueness.
- Each item contains name, description, and a createdAt timestamp.
- DynamoDB uses the PAY_PER_REQUEST billing mode for simplicity and scalability.
- API endpoints are publicly accessible without authentication for this assignment.
- Input validation is handled within each Lambda function.

## 👤 Author
Ochogwu Emmanuel
Backend Developer | Node.js • TypeScript • AWS
GitHub: https://github.com/EmmanuelEmp