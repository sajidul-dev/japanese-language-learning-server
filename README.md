# Node.js + Express + Mongoose + TypeScript Boilerplate

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mongodb,ts)]()

A boilerplate for building scalable backend applications using **Node.js**, **Express**, **Mongoose**, and **TypeScript** with built-in tools for better code quality and development workflow.

## Features

- **TypeScript**: Strongly typed JavaScript for improved developer productivity and maintainability.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB, simplifying database operations.
- **ESLint**: Static code analysis to maintain a clean and consistent codebase.
- **Prettier**: Code formatter to enforce a uniform code style.
- **Husky**: Pre-commit hooks to ensure code quality checks before committing.
- **Global Error Handler**: Centralized error handling for better maintainability and debugging.
- **Environment Configuration**: Manage environment-specific variables securely.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

---

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/sajidul-dev/express-typescript-mongoose-starter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd express-typescript-mongoose-starter
   ```
3. Install dependencies:
   ```bash
   npm install
   #or
   yarn install
   ```

---

### Running the project

1. Copy `.env.example` to `.env` and configure the environment variables:

   ```bash
   cp .env.example .env
   ```

2. Start the development server:
   ```bash
   npm run dev
   #or
   yarn dev
   ```
3. Build and run for production:

   ```bash
   npm run build
   npm start

   #or
   yarn build
   yarn start
   ```

---

### Project Scripts

| Scripts                                           | Description                           |
| ------------------------------------------------- | ------------------------------------- |
| `npm run dev` or `yarn dev`                       | Run the app in development mode.      |
| `npm run build` or `yarn build`                   | Build the app for production.         |
| `npm start` or `yarn start`                       | Run the built app in production mode. |
| `npm run lint:check` or `yarn lint:check`         | Check code for linting issues.        |
| `npm run lint:fix` or ` yarn lint:fix`            | Fix linting issues automatically.     |
| `npm run prettier:check` or `yarn prettier:check` | Format code using Prettier.           |

---

### Key Features

#### ESLint

- Enforces code quality and consistency.
- Run `npm run lint:check` to check for issues.

#### Prettier

- Automatically formats code to maintain uniform style.
- Run `npm run prettier:check` to format the entire codebase.

#### Husky

- Pre-commit hooks to prevent bad code from being committed.
- Includes linting and formatting checks before each commit.

#### Global Error Handler

- Centralized middleware for handling errors across the application.
- Ensures consistent error responses and detailed debugging information in development.

#### Zod Error Handler

- TypeScript-first schema validation.

### **Folder Structure**

The project is organized into the following structure:

```
src/
|
├── app/
│   ├── middleware/            # Express middleware
│   │   ├── globalErrorHandler.ts # Error handler for entire application
│   │   └── validateRequest.ts #
│   ├── modules/               # Feature modules
│   │   └── user/
├── config/                 # Application configuration
│   │   └── index.ts        # (e.g., database, environment)
├── errors/
│   │   ├── ApiError.ts     # Common error response
│   │   └── handleZodError.ts     # Common zod error handler
├── interfaces/
│   │   ├── common.ts     # All common interfaces
│   │   └── error.ts     # Common error interfaces
├── shared/
│   │   ├── catchAsync.ts     # Handler for async function
│   │   └── sendResponse.ts     # Common response
├── app.ts                 # Express app setup
├── app.ts                 # Express app setup
│── server.ts              # Server entry point
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```
