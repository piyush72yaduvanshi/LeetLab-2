# LeetCode Clone Backend Documentation

## Overview

This is a comprehensive backend API for a LeetCode-style coding platform built with Node.js, Express.js, and Prisma ORM. The system provides user authentication, problem management, code execution, submission tracking, playlist functionality, and AI-powered chatbot assistance.

## Table of Contents

1. [Architecture](#architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Authentication & Authorization](#authentication--authorization)
7. [Code Execution System](#code-execution-system)
8. [AI Chatbot Integration](#ai-chatbot-integration)
9. [Environment Configuration](#environment-configuration)
10. [Installation & Setup](#installation--setup)
11. [Development Guidelines](#development-guidelines)

## Architecture

The backend follows a layered architecture pattern:

```
┌─────────────────┐
│   Controllers   │ ← Business Logic Layer
├─────────────────┤
│   Middlewares   │ ← Authentication & Validation
├─────────────────┤
│     Routes      │ ← API Endpoint Definitions
├─────────────────┤
│      Libs       │ ← Utility Functions & External APIs
├─────────────────┤
│   Prisma ORM    │ ← Database Access Layer
└─────────────────┘
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL with Prisma ORM 6.6.0
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 3.0.2
- **Code Execution**: Judge0 API integration
- **AI Integration**: Google Generative AI (Gemini)
- **HTTP Client**: Axios 1.8.4
- **Middleware**: CORS, Morgan (logging), Cookie Parser
- **Development**: Nodemon, Prettier

## Project Structure

```
backend/
├── src/
│   ├── controllers/          # Business logic handlers
│   │   ├── auth.controller.js
│   │   ├── problem.controller.js
│   │   ├── submission.controller.js
│   │   ├── playlist.controller.js
│   │   ├── executeCode.controller.js
│   │   └── chatbot.controller.js
│   ├── middlewares/          # Authentication & validation
│   │   └── auth.middleware.js
│   ├── routes/              # API route definitions
│   │   ├── auth.routes.js
│   │   ├── problems.routes.js
│   │   ├── submission.routes.js
│   │   ├── playlist.routes.js
│   │   ├── executeCode.routes.js
│   │   └── chatbot.routes.js
│   ├── libs/                # Utility functions
│   │   ├── db.js            # Prisma client configuration
│   │   └── problem.libs.js   # Judge0 integration utilities
│   ├── generated/           # Prisma generated client
│   └── index.js             # Application entry point
├── prisma/
│   ├── schema.prisma        # Database schema definition
│   └── migrations/          # Database migration files
├── package.json
└── .env.local              # Environment variables
```

## Database Schema

### Core Models

#### User Model
```prisma
model User {
  id             String          @id @default(uuid())
  name           String?         @unique
  email          String          @unique
  image          String?
  role           UserRole        @default(USER)
  password       String
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  
  // Relations
  playlists      Playlist[]
  problems       Problem[]
  solvedProblems ProblemSolved[]
  submissions    Submission[]
  chatHistory    ChatHistory[]
}

enum UserRole {
  ADMIN
  USER
}
```

#### Problem Model
```prisma
model Problem {
  id                 String              @id @default(uuid())
  title              String
  description        String
  difficulty         Difficulty
  tags               String[]
  userId             String
  examples           Json                # Example inputs/outputs
  constraints        String
  hints              String?
  editorial          String?
  testCases          Json                # Test case data
  codeSnippets       Json                # Language-specific starter code
  referenceSolutions Json                # Admin reference solutions
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
  
  // Relations
  user               User                @relation(fields: [userId], references: [id])
  problemsPlaylists  ProblemInPlaylist[]
  solvedBy           ProblemSolved[]
  submissions        Submission[]
  chatHistory        ChatHistory[]
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}
```

#### Submission Model
```prisma
model Submission {
  id            String           @id @default(uuid())
  userId        String
  problemId     String
  language      String
  stdin         String?
  stdout        String?
  stderr        String?
  compileOutput String?
  status        String           # "Accepted", "Wrong Answer", etc.
  memory        String?
  time          String?
  sourceCode    Json             # User's submitted code
  createdAt     DateTime         @default(now())
  
  // Relations
  problem       Problem          @relation(fields: [problemId], references: [id])
  user          User             @relation(fields: [userId], references: [id])
  testCases     TestCaseResult[]
}
```

### Additional Models

- **TestCaseResult**: Individual test case execution results
- **ProblemSolved**: Tracks which problems users have solved
- **Playlist**: User-created problem collections
- **ProblemInPlaylist**: Many-to-many relation between problems and playlists
- **ChatHistory**: AI chatbot conversation history
- **TokenBlacklist**: JWT token blacklisting for security

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | User registration | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | No |
| GET | `/check` | Verify authentication | Yes |
| GET | `/get-submissions` | Get user submissions | Yes |
| GET | `/get-playlists` | Get user playlists | Yes |

### Problem Routes (`/api/v1/problems`)

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| POST | `/create-problem` | Create new problem | Yes | Yes |
| GET | `/get-all-problems` | Get all problems | Yes | No |
| GET | `/get-problem/:id` | Get problem by ID | No | No |
| PUT | `/update-problem/:id` | Update problem | Yes | Yes |
| DELETE | `/delete-problem/:id` | Delete problem | Yes | Yes |
| GET | `/get-solved-problem` | Get user's solved problems | Yes | No |

### Code Execution Routes (`/api/v1/execute-code`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/test` | Test code without submission | Yes |
| POST | `/` | Submit code and create submission | Yes |

### Submission Routes (`/api/v1/submissions`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/get-all-submissions` | Get all user submissions | Yes |
| GET | `/get-submissions/:problemId` | Get submissions for specific problem | Yes |
| GET | `/get-submissions-count/:problemId` | Get submission count for problem | Yes |

### Playlist Routes (`/api/v1/playlist`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all user playlists | Yes |
| GET | `/:playlistId` | Get playlist details | Yes |
| POST | `/create-playlist` | Create new playlist | Yes |
| POST | `/:playlistId/add-problem` | Add problems to playlist | Yes |
| DELETE | `/:playlistId` | Delete playlist | Yes |
| DELETE | `/:playlistId/remove-problem` | Remove problems from playlist | Yes |

### Chatbot Routes (`/api/v1/chatbot`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/chat` | Send message to AI chatbot | Yes |
| GET | `/history/:problemId` | Get chat history for problem | Yes |
| POST | `/save` | Save chat message | Yes |

## Authentication & Authorization

### JWT Implementation

The system uses JSON Web Tokens (JWT) for authentication:

```javascript
// Token generation
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

// Cookie configuration
res.cookie("jwt", token, {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV !== "development",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

### Middleware Protection

```javascript
// Authentication middleware
export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token Provided" });
  }
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await db.user.findUnique({ where: { id: decoded.id } });
  
  req.user = user;
  next();
};

// Admin authorization middleware
export const checkAdmin = async (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. User is not an admin.' });
  }
  next();
};
```

## Code Execution System

### Judge0 Integration

The platform integrates with Judge0 API for secure code execution:

```javascript
// Language mapping
const languageMap = {
  "PYTHON": 71,
  "JAVASCRIPT": 63,
  "JAVA": 62,
  "CPP": 54,
  "GO": 60,
  "TYPESCRIPT": 74,
};

// Batch submission to Judge0
export async function submitBatch(submissions) {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions }
  );
  return data;
}

// Poll for results
export async function pollBatchResults(tokens) {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      { params: { tokens: tokens.join(","), base64_encoded: false } }
    );
    
    const results = data.submissions;
    const isAllDone = results.every(r => r.status.id !== 1 && r.status.id !== 2);
    if (isAllDone) return results;
    
    await sleep(1000);
  }
}
```

### Test vs Submit Flow

1. **Test Code** (`/test`): Executes code against test cases without creating submission record
2. **Submit Code** (`/`): Executes code, creates submission record, and marks problem as solved if all tests pass

## AI Chatbot Integration

### Gemini AI Configuration

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `You are an expert DSA tutor...`
});
```

### Chatbot Capabilities

- **Hint Provider**: Step-by-step guidance without revealing complete solutions
- **Code Reviewer**: Debug and fix code submissions with explanations
- **Solution Guide**: Provide optimal solutions with detailed explanations
- **Complexity Analyzer**: Explain time and space complexity trade-offs
- **Approach Suggester**: Recommend different algorithmic approaches

## Environment Configuration

### Required Environment Variables

```bash
# Server Configuration
PORT=8080

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Authentication
JWT_SECRET=your_jwt_secret_key

# Judge0 API
JUDGE0_API_URL=http://localhost:2358/
SKIP_JUDGE0_VALIDATION=true  # For development when Judge0 is not running

# AI Integration
GEMINI_API_KEY=your_gemini_api_key
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Judge0 API server (optional for development)
- Google Gemini API key

### Installation Steps

1. **Clone and install dependencies**:
```bash
cd backend
npm install
```

2. **Database setup**:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

3. **Environment configuration**:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server**:
```bash
npm run dev
```

### Database Migration

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npx prisma migrate reset

# Deploy to production
npx prisma migrate deploy
```

## Development Guidelines

### Code Structure

1. **Controllers**: Handle business logic and HTTP responses
2. **Middlewares**: Handle cross-cutting concerns (auth, validation)
3. **Routes**: Define API endpoints and apply middlewares
4. **Libs**: Utility functions and external service integrations

### Error Handling

```javascript
// Standard error response format
try {
  // Business logic
  res.status(200).json({
    success: true,
    message: "Operation successful",
    data: result
  });
} catch (error) {
  console.error("Error description:", error);
  res.status(500).json({ 
    error: "User-friendly error message",
    details: error.message // Only in development
  });
}
```

### Security Best Practices

1. **Password Hashing**: Use bcryptjs with salt rounds
2. **JWT Security**: HttpOnly cookies, secure flags in production
3. **Input Validation**: Validate all user inputs
4. **SQL Injection Prevention**: Use Prisma ORM parameterized queries
5. **CORS Configuration**: Restrict origins in production
6. **Rate Limiting**: Implement rate limiting for API endpoints

### Testing Strategy

1. **Unit Tests**: Test individual functions and utilities
2. **Integration Tests**: Test API endpoints with database
3. **End-to-End Tests**: Test complete user workflows
4. **Load Testing**: Test performance under load

### Deployment Considerations

1. **Environment Variables**: Use production-safe values
2. **Database**: Use connection pooling for production
3. **Logging**: Implement structured logging
4. **Monitoring**: Add health checks and metrics
5. **Security**: Enable HTTPS, security headers
6. **Scaling**: Consider horizontal scaling strategies

---

This documentation provides a comprehensive overview of the LeetCode Clone backend system. For specific implementation details, refer to the individual source files and inline comments.