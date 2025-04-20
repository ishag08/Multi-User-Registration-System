# Multi-User-Registration-System
A Node.js and Express.js backend for a Farmer & SCP Registration System, built with PostgreSQL. This project enables separate registration and login functionality for Farmers and SCP (Service Center Providers), with a clean API structure and modular codebase.

 Features:
 
=> Farmer and SCP registration & login APIs
=> Role-based authentication endpoints
=> PostgreSQL database integration
=> Tested using Postman
=> Clean and well-documented code

🚀 Tech Stack
Backend Framework: Node.js with Express.js

Database: PostgreSQL

🛠️ Tools
These are the essential tools and platforms used during the development of this project:​

Node.js: JavaScript runtime environment for executing server-side code.

npm: Package manager for installing project dependencies.

PostgreSQL: Relational database system for storing and managing data.

pgAdmin: Graphical interface for managing PostgreSQL databases.

Postman: API testing tool to send requests and view responses.

VS Code: Source-code editor for writing and editing code.​

📦 Dependencies
These are the Node.js packages required for the project to function correctly:​

express: Web framework for building server-side applications.

cors: Middleware to enable Cross-Origin Resource Sharing.

pg: PostgreSQL client for Node.js to interact with the database.

bcrypt: Library for hashing passwords securely.

jsonwebtoken: Implementation of JSON Web Tokens for authentication.

nodemon (dev dependency): Utility that monitors for file changes and automatically restarts the server during development.

    
📁 Project Structure

Bd-task/
│
├── frontend/                  # Contains HTML pages for UI
│   ├── register-scp.html
│   ├── register-farmer.html
│   ├── login-scp.html
│   ├── login-farmer.html
│   ├── scp-dashboard.html
│   └── farmer-network.html
│
├── src/
│   ├── config/
│   │   └── database.js         # PostgreSQL connection setup
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── scpController.js
│   │   └── farmerController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scpRoutes.js
│   │   └── farmerRoutes.js
│   └── utils/
│       └── jwtUtils.js
│
├── app.js                     # App entry point
└── .gitignore

📮 API Endpoints

 🔐 Authentication Routes
    POST /auth/register/scp – Register a new SCP
    POST /auth/register/farmer – Register a new Farmer
    POST /auth/login/scp – SCP Login
    POST /auth/login/farmer – Farmer Login

📄 Data Retrieval Routes
    GET /scp/dashboard – Retrieve SCP Dashboard Data
    GET /farmers/network – Retrieve Farmers Network under an SCP

🔗 Useful Links
Node.js: nodejs.org
npm: npmjs.com
Express.js: expressjs.com
PostgreSQL: postgresql.org
pgAdmin: pgadmin.org
Postman: postman.com
bcrypt: npmjs.com/package/bcrypt
jsonwebtoken: npmjs.com/package/jsonwebtoken
nodemon: npmjs.com/package/nodemon


Made with ❤️ by Isha
Backend Developer | Java | Node.js | PostgreSQL | Python
