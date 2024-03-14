# Real-Time Chat App

## Description

The Real-Time Chat App is a web-based application that allows users to communicate with each other in real-time. It provides a seamless and interactive chat experience, enabling users to send messages, join chat rooms, and engage in group conversations

## Features

- User Registration and Authentication:
  • Registration using username and password
  • Login system that provides a token to the user for subsequent requests
  • JWT for secure user authentication, with tokens securely stored and managed
  • Session created using Redis

- Real-Time Chat:
  • Users able to join and leave rooms
  • Users able to send messages to the specific chat room in a real-time using Socket.IO
  • Each message contains information about user who sent it
  • Users currently in the chat room are able to see messages in real-time

- Message Storage:
  • Messages stored to a MongoDB database
  • Last 50 messages chached in Redis for faster history retreival
  • On user joining the the room, latest messages are retreived and shown to the user

- Rate Limiting:
  • Rate limiting implemented to prevent spamming using Redis
  • User can send up to 10 messages per minute

- Frontend Application:
  • Simple frontend built using React.js and Material UI
  • Redux and redux toolkit used for global state management

- Deployment:
  • Application deployed to Render

## Extra Features

- User Online Status:
  • User's online status shown in real time

- Persistent Chat Rooms:
  • User can create chat rooms
  • Room is stored to the persistant database MongoDB
  • Room is added to the Redis cache for faster rooms retreival
  • Users can join the room and start to chat

## Installation

1. Clone the repository: `git clone https://github.com/IgorZecevic/Real-Time-Chat.git`
2. Change .env.example to .env and set enviroment variables
3. Install dependencies: `npm run build`
4. Start the server: `npm start`
5. Open your browser and navigate to `http://localhost:5000`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Socket.io
- Redis
- React.js

## Live Demo

https://real-time-chat-t1yz.onrender.com

## Testing Accounts

username: JohnDoe <br/>
password: 123456<br/>

username: JaneSmith<br/>
password: 123456<br/>

## Technical Details and Design

The Real-Time Chat App is designed with a clear separation of concerns, following a Model-View-Controller (MVC) pattern on the backend and a modular structure on the frontend

### Backend Structure

- app.js: Serves as the entry point of the backend, configuring middleware, routes, and static file serving for the React frontend
- server.js: Sets up the HTTP server and Socket.IO for real-time communication
- /src: Contains the core backend application code
  - /config: Contains configuration files
  - /controllers: Holds controller files where the logic for handling requests is defined. Controllers call upon services to perform the business logic
  - /middlewares: Contains middleware functions for tasks such as error handling and authentication
  - /models: Includes the data models for MongoDB
  - /repositories: Encapsulates the logic for accessing data sources, making the application more maintainable and the database queries more reusable
  - /routes: Contains the Express routes that map incoming requests to the appropriate controllers
  - /services: Contains service files that hold the business logic of the application, abstracting it away from the controllers
  - /sockets: Manages the WebSocket connections and the events associated with real-time chatting
  - /utils: Provides utility functions and helpers used across the application

### Frontend Structure

- /src: Contains the source code of the frontend application
  - /components: Holds all React components, structured in a modular way to promote reusability
  - /context: Includes React Contexts used for managing state that’s shared across multiple components
  - /customHooks: Contains custom React hooks that encapsulate and share logic between components
  - /pages: Includes the different pages of the application, each corresponding to a route in the React application
  - /redux: Manages the global state using Redux, with the Redux Toolkit to simplify setup and operation
  - /services: Defines functions for HTTP requests to interact with the backend API
  - /sockets: Contains logic for managing WebSocket connections using Socket.IO client
  - /utils: Provides utility functions that are used across the frontend

### Design Decisions

- MVC Pattern: The backend follows the MVC pattern to organize code in a way that is both scalable and easy to maintain. This pattern was chosen for its proven track record in building robust web applications
- Socket.IO: For real-time bi-directional event-based communication, Socket.IO was chosen for its ease of use, reliability, and compatibility across different platforms and browsers
- Redis: Utilized for session management, fast data retreival and rate limiting due to its performance efficiency in handling high-speed transactions and data persistence
- React and Material UI: The frontend is built with React to efficiently manage the dynamic aspects of real-time chatting. Material UI is integrated to speed up development, providing a suite of ready-made components out of the box
- Redux and Redux Toolkit: To manage the application's global state with efficiency, predictability, and debuggability, ensuring that the UI is always consistent with the state
