# 🧩 AWS Lambda + DynamoDB + API Gateway Projects

This repository contains two AWS serverless projects implemented using **AWS SAM**, **Lambda**, **API Gateway**, and **DynamoDB**, written in **TypeScript**.

---

## 📁 Projects

### 1. [`aws-crud-api/`](./crud-api)
A serverless REST API to manage items with full **Create**, **Read**, **Update**, and **Delete** functionality.

- Built using AWS Lambda + API Gateway + DynamoDB
- Independent Lambda handlers for each operation
- Designed for scalable, real-time access
- Includes detailed error handling and input validation

> See [`aws-crud-api/README.md`](./aws-crud-api/README.md) for setup, deployment, and testing instructions.

---

### 2. [`archive-service/`](./archive-service)
A scheduled Lambda function that **archives old DynamoDB records** (older than 30 days) to **S3** in JSON format and deletes them from the database.

- Triggered daily via CloudWatch Events
- Archives items with `createdAt` timestamp
- Optimized for batch processing and cleanup

> See [`archive-service/README.md`](./archive-service/README.md) for setup, schedule configuration, and behavior.

---

## 🛠️ Technologies Used

- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Amazon S3
- CloudWatch Events
- AWS SAM
- TypeScript
- AWS SDK v3

---

## 👨‍💻 Author

**Ochogwu Emmanuel**  
Backend Developer — Node.js | TypeScript | AWS

---

## 📜 License

This project is released under the [MIT License](LICENSE).
