# Database Schema Documentation

## Overview

The LeetCode Clone backend uses PostgreSQL as the primary database with Prisma ORM for database access and migrations. The schema is designed to support a comprehensive coding platform with user management, problem creation, code execution tracking, playlist functionality, and AI chatbot interactions.

## Database Configuration

```javascript
// Prisma Client Configuration (src/libs/db.js)
import { PrismaClient } from '../generated/prisma/index.js';

export const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

## Schema Overview

The database consists of 10 main models with well-defined relationships:

```
User ──┬── Problem (1:N)
       ├── Submission (1:N)
       ├── ProblemSolved (1:N)
       ├── Playlist (1:N)
       └── ChatHistory (1:N)

Problem ──┬── Submission (1:N)
          ├── ProblemSolved (1:N)
          ├── ProblemInPlaylist (1:N)
          └── ChatHistory (1:N)

Submission ── TestCaseResult (1:N)

Playlist ── ProblemInPlaylist (1:N)
```

---

## Core Models

### User Model

Stores user account information and authentication data.

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
  
  // Relationships
  playlists      Playlist[]
  problems       Problem[]
  solvedProblems ProblemSolved[]
  submissions    Submission[]
  chatHistory    ChatHistory[]

  @@index([role])
}

enum UserRole {
  ADMIN
  USER
}
```

**Fields:**
- `id`: Primary key (UUID)
- `name`: User's display name (unique, optional)
- `email`: User's email address (unique, required)
- `image`: Profile image URL (optional)
- `role`: User role (ADMIN or USER, defaults to USER)
- `password`: Hashed password using bcryptjs
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Indexes:**
- `role`: For efficient role-based queries

**Relationships:**
- One-to-many with Problem (problems created by user)
- One-to-many with Submission (user's code submissions)
- One-to-many with ProblemSolved (problems solved by user)
- One-to-many with Playlist (user's playlists)
- One-to-many with ChatHistory (user's chat messages)

---

### Problem Model

Stores coding problem definitions, test cases, and metadata.

```prisma
model Problem {
  id                 String              @id @default(uuid())
  title              String
  description        String
  difficulty         Difficulty
  tags               String[]
  userId             String
  examples           Json
  constraints        String
  hints              String?
  editorial          String?
  testCases          Json
  codeSnippets       Json
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
  referenceSolutions Json
  
  // Relationships
  user               User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  problemsPlaylists  ProblemInPlaylist[]
  solvedBy           ProblemSolved[]
  submissions        Submission[]
  chatHistory        ChatHistory[]

  @@index([difficulty])
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}
```

**Fields:**
- `id`: Primary key (UUID)
- `title`: Problem title
- `description`: Detailed problem description
- `difficulty`: Problem difficulty level (EASY, MEDIUM, HARD)
- `tags`: Array of problem tags/categories
- `userId`: ID of the user who created the problem (admin)
- `examples`: JSON object containing example inputs/outputs
- `constraints`: Problem constraints and limitations
- `hints`: Optional hints for solving the problem
- `editorial`: Optional editorial/solution explanation
- `testCases`: JSON array of test case inputs and expected outputs
- `codeSnippets`: JSON object with starter code for different languages
- `referenceSolutions`: JSON object with reference solutions for validation

**JSON Field Structures:**

**Examples:**
```json
{
  "example1": {
    "input": "[2,7,11,15], target = 9",
    "output": "[0,1]",
    "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
  },
  "example2": {
    "input": "[3,2,4], target = 6",
    "output": "[1,2]"
  }
}
```

**Test Cases:**
```json
[
  {
    "input": "[2,7,11,15]\n9",
    "output": "[0,1]"
  },
  {
    "input": "[3,2,4]\n6",
    "output": "[1,2]"
  }
]
```

**Code Snippets:**
```json
{
  "JAVASCRIPT": "function twoSum(nums, target) {\n    // Your code here\n}",
  "PYTHON": "def two_sum(nums, target):\n    # Your code here\n    pass",
  "JAVA": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}"
}
```

**Reference Solutions:**
```json
{
  "JAVASCRIPT": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n}",
  "PYTHON": "def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i"
}
```

**Indexes:**
- `difficulty`: For filtering problems by difficulty

---

### Submission Model

Tracks user code submissions and execution results.

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
  status        String
  memory        String?
  time          String?
  createdAt     DateTime         @default(now())
  sourceCode    Json
  
  // Relationships
  problem       Problem          @relation(fields: [problemId], references: [id], onDelete: Cascade)
  user          User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  testCases     TestCaseResult[]

  @@index([status])
}
```

**Fields:**
- `id`: Primary key (UUID)
- `userId`: ID of the user who made the submission
- `problemId`: ID of the problem being solved
- `language`: Programming language used (JavaScript, Python, Java, etc.)
- `stdin`: Input data for test cases (JSON string)
- `stdout`: Output from code execution (JSON string)
- `stderr`: Error output if any (JSON string)
- `compileOutput`: Compilation errors if any (JSON string)
- `status`: Overall submission status ("Accepted", "Wrong Answer", etc.)
- `memory`: Memory usage information (JSON string)
- `time`: Execution time information (JSON string)
- `sourceCode`: User's submitted code (JSON object)
- `createdAt`: Submission timestamp

**Source Code Structure:**
```json
{
  "code": "function twoSum(nums, target) {\n    const map = new Map();\n    // ... rest of the code\n}"
}
```

**Indexes:**
- `status`: For filtering submissions by status

---

### TestCaseResult Model

Stores individual test case execution results for each submission.

```prisma
model TestCaseResult {
  id            String     @id @default(uuid())
  submissionId  String
  testCase      Int
  passed        Boolean
  stdout        String?
  expected      String
  stderr        String?
  compileOutput String?
  status        String
  memory        String?
  time          String?
  createdAt     DateTime   @default(now())
  
  // Relationships
  submission    Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)

  @@index([submissionId])
}
```

**Fields:**
- `id`: Primary key (UUID)
- `submissionId`: ID of the parent submission
- `testCase`: Test case number (1, 2, 3, etc.)
- `passed`: Whether this test case passed (boolean)
- `stdout`: Actual output from code execution
- `expected`: Expected output for this test case
- `stderr`: Error output for this test case
- `compileOutput`: Compilation errors for this test case
- `status`: Status description from Judge0
- `memory`: Memory usage for this test case
- `time`: Execution time for this test case
- `createdAt`: Result timestamp

**Indexes:**
- `submissionId`: For efficient retrieval of test results for a submission

---

## Problem Tracking Models

### ProblemSolved Model

Tracks which problems each user has successfully solved.

```prisma
model ProblemSolved {
  id        String   @id @default(uuid())
  userId    String
  problemId String
  createdAt DateTime @default(now())
  
  // Relationships
  problem   Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, problemId])
}
```

**Fields:**
- `id`: Primary key (UUID)
- `userId`: ID of the user who solved the problem
- `problemId`: ID of the solved problem
- `createdAt`: Timestamp when problem was first solved

**Constraints:**
- `@@unique([userId, problemId])`: Ensures a user can only have one "solved" record per problem

---

## Playlist System Models

### Playlist Model

Stores user-created collections of problems.

```prisma
model Playlist {
  id          String              @id @default(uuid())
  name        String
  description String?
  userId      String
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
  
  // Relationships
  user        User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  problems    ProblemInPlaylist[]

  @@unique([name, userId])
}
```

**Fields:**
- `id`: Primary key (UUID)
- `name`: Playlist name
- `description`: Optional playlist description
- `userId`: ID of the user who created the playlist
- `createdAt`: Playlist creation timestamp
- `updatedAt`: Last update timestamp

**Constraints:**
- `@@unique([name, userId])`: Ensures unique playlist names per user

---

### ProblemInPlaylist Model

Junction table for many-to-many relationship between playlists and problems.

```prisma
model ProblemInPlaylist {
  id         String   @id @default(uuid())
  playlistId String
  problemId  String
  createdAt  DateTime @default(now())
  
  // Relationships
  playlist   Playlist @relation(fields: [playlistId], references: [id], onDelete: Cascade)
  problem    Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)

  @@unique([playlistId, problemId])
}
```

**Fields:**
- `id`: Primary key (UUID)
- `playlistId`: ID of the playlist
- `problemId`: ID of the problem
- `createdAt`: Timestamp when problem was added to playlist

**Constraints:**
- `@@unique([playlistId, problemId])`: Prevents duplicate problems in the same playlist

---

## AI Chatbot Model

### ChatHistory Model

Stores AI chatbot conversation history for each user and problem.

```prisma
model ChatHistory {
  id          String   @id @default(uuid())
  userId      String
  problemId   String
  message     String
  response    String
  messageType String   @default("general")
  createdAt   DateTime @default(now())
  
  // Relationships
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  problem     Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)

  @@index([userId, problemId])
}
```

**Fields:**
- `id`: Primary key (UUID)
- `userId`: ID of the user who sent the message
- `problemId`: ID of the problem being discussed
- `message`: User's message to the AI
- `response`: AI's response
- `messageType`: Type of message (general, hint, code_review, solution)
- `createdAt`: Message timestamp

**Message Types:**
- `general`: General questions about the problem
- `hint`: Requests for hints
- `code_review`: Code review requests
- `solution`: Solution explanation requests

**Indexes:**
- `[userId, problemId]`: For efficient retrieval of chat history for a user-problem pair

---

## Security Model

### TokenBlacklist Model

Stores blacklisted JWT tokens for security purposes.

```prisma
model TokenBlacklist {
  id        String   @id @default(uuid())
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

**Fields:**
- `id`: Primary key (UUID)
- `token`: The blacklisted JWT token
- `expiresAt`: When the token expires
- `createdAt`: When the token was blacklisted

**Usage:**
This model can be used to implement token revocation for enhanced security, though it's not currently implemented in the authentication middleware.

---

## Database Relationships Summary

### One-to-Many Relationships

1. **User → Problem**: Users (admins) can create multiple problems
2. **User → Submission**: Users can make multiple submissions
3. **User → ProblemSolved**: Users can solve multiple problems
4. **User → Playlist**: Users can create multiple playlists
5. **User → ChatHistory**: Users can have multiple chat messages
6. **Problem → Submission**: Problems can have multiple submissions
7. **Problem → ProblemSolved**: Problems can be solved by multiple users
8. **Problem → ProblemInPlaylist**: Problems can be in multiple playlists
9. **Problem → ChatHistory**: Problems can have multiple chat discussions
10. **Submission → TestCaseResult**: Submissions can have multiple test case results
11. **Playlist → ProblemInPlaylist**: Playlists can contain multiple problems

### Many-to-Many Relationships

1. **User ↔ Problem** (via ProblemSolved): Users can solve multiple problems, problems can be solved by multiple users
2. **Playlist ↔ Problem** (via ProblemInPlaylist): Playlists can contain multiple problems, problems can be in multiple playlists

---

## Migration Strategy

### Development Migrations

```bash
# Create a new migration
npx prisma migrate dev --name descriptive_migration_name

# Reset database (development only)
npx prisma migrate reset

# Generate Prisma client after schema changes
npx prisma generate
```

### Production Migrations

```bash
# Deploy migrations to production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status
```

### Migration Best Practices

1. **Backward Compatibility**: Ensure migrations don't break existing functionality
2. **Data Preservation**: Use data migration scripts for complex schema changes
3. **Testing**: Test migrations on a copy of production data
4. **Rollback Plan**: Have a rollback strategy for failed migrations
5. **Incremental Changes**: Make small, incremental changes rather than large schema overhauls

---

## Performance Considerations

### Indexes

Current indexes are optimized for common query patterns:

- `User.role`: For admin/user filtering
- `Problem.difficulty`: For difficulty-based filtering
- `Submission.status`: For status-based filtering
- `TestCaseResult.submissionId`: For test result retrieval
- `ChatHistory.[userId, problemId]`: For chat history retrieval

### Query Optimization

1. **Use Select Statements**: Only fetch required fields
2. **Include Relations**: Use Prisma's `include` for efficient joins
3. **Pagination**: Implement pagination for large result sets
4. **Connection Pooling**: Use connection pooling in production

### Scaling Considerations

1. **Read Replicas**: Consider read replicas for heavy read workloads
2. **Caching**: Implement Redis caching for frequently accessed data
3. **Partitioning**: Consider table partitioning for large tables (submissions, test results)
4. **Archiving**: Archive old submissions and test results

---

## Data Integrity

### Cascade Deletes

The schema uses `onDelete: Cascade` for maintaining referential integrity:

- Deleting a user cascades to their problems, submissions, playlists, and chat history
- Deleting a problem cascades to its submissions, solved records, playlist associations, and chat history
- Deleting a submission cascades to its test case results
- Deleting a playlist cascades to its problem associations

### Unique Constraints

- `User.email`: Prevents duplicate email addresses
- `User.name`: Prevents duplicate usernames (optional field)
- `Playlist.[name, userId]`: Prevents duplicate playlist names per user
- `ProblemSolved.[userId, problemId]`: Prevents duplicate solved records
- `ProblemInPlaylist.[playlistId, problemId]`: Prevents duplicate problems in playlists

---

This schema provides a robust foundation for a coding platform with room for future enhancements such as contests, discussions, and advanced analytics.