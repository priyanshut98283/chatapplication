
#Real-Time Chat Application Backend
Welcome to the README file for the backend of our Real-Time Chat Application! This document serves as a guide to help you set up, run, and understand the functionalities of our comprehensive backend system.

Environment Configuration
Before you begin, make sure to configure the following environment variables:
#Make .env file and add these
PORT: Set to 5000.
MONGO_DB_URI: Your MongoDB connection URI.
JWT_SECRET: Secret key for JSON Web Token encryption.
NODE_ENV:
Setup Instructions
Follow these steps to set up and run the backend system:

Clone the Repository: Clone the repository to your local machine.

Install Dependencies: Run npm install to install all required dependencies.

Build the Application: Execute npm run build to build the application.

Start the Server: Launch the server with npm start.

Features and Functionality
1. User Authentication
Registration and Login: Implemented a secure registration and login system where users sign up with an email and password.
JWT Authentication: Utilized JSON Web Tokens (JWT) for managing authentication, ensuring secure access.
2. Chat Functionality
Real-Time Messaging: Enabled users to send and receive messages in real-time.
Socket.io Integration: Utilized Socket.io for efficient real-time communication between users.
3. Message Storage
MongoDB Database: Stores all chat messages in MongoDB, ensuring seamless retrieval for ongoing conversations.
4. User Online Status and LLM Integration
User Status: Allows users to set their online status as 'AVAILABLE' or 'BUSY'.
LLM Integration: Integrates with a Language Model API (LLM) to generate appropriate responses for 'BUSY' users.
Response Timeout: Ensures LLM API responses are sent within 10 seconds; otherwise, a standard message indicating unavailability is sent.
5. Frontend: Provided a simple but nice ui frontend to demonstrate backend functionalities for testing and demonstration purposes.
