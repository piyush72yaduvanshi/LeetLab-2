# API Reference Documentation

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication

All protected endpoints require a JWT token sent as an HTTP-only cookie named `jwt`.

### Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "message": "Operation description",
  "data": {} // Response data (varies by endpoint)
}
```

Error responses:
```json
{
  "error": "Error description",
  "details": "Additional error details (development only)"
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER",
    "image": null
  }
}
```

**Errors:**
- `400`: User already exists
- `500`: Registration failed

---

### Login User
**POST** `/auth/login`

Authenticate user and set JWT cookie.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER",
    "image": null
  }
}
```

**Errors:**
- `404`: User not found
- `401`: Invalid credentials
- `500`: Login failed

---

### Logout User
**POST** `/auth/logout`

Clear JWT cookie and logout user.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Check Authentication
**GET** `/auth/check`

Verify current authentication status.

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "User authenticated successfully",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "USER",
    "image": null
  }
}
```

**Errors:**
- `401`: Unauthorized - No Token Provided
- `401`: Unauthorized - Invalid Token
- `404`: User not found

---

## Problem Management Endpoints

### Get All Problems
**GET** `/problems/get-all-problems`

Retrieve all problems with user's solved status.

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Problems fetched successfully",
  "problems": [
    {
      "id": "uuid",
      "title": "Two Sum",
      "description": "Given an array of integers...",
      "difficulty": "EASY",
      "tags": ["Array", "Hash Table"],
      "examples": {
        "example1": {
          "input": "[2,7,11,15], target = 9",
          "output": "[0,1]",
          "explanation": "Because nums[0] + nums[1] == 9"
        }
      },
      "constraints": "2 <= nums.length <= 10^4",
      "hints": "Try using a hash map",
      "testCases": [
        {
          "input": "[2,7,11,15]\n9",
          "output": "[0,1]"
        }
      ],
      "codeSnippets": {
        "JAVASCRIPT": "function twoSum(nums, target) {\n    // Your code here\n}",
        "PYTHON": "def two_sum(nums, target):\n    # Your code here\n    pass"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "solvedBy": [] // Empty if not solved by current user
    }
  ]
}
```

---

### Get Problem by ID
**GET** `/problems/get-problem/:id`

Retrieve a specific problem by its ID.

**Parameters:**
- `id` (string): Problem UUID

**Response (200):**
```json
{
  "success": true,
  "message": "Problem fetched successfully",
  "problem": {
    "id": "uuid",
    "title": "Two Sum",
    "description": "Given an array of integers...",
    "difficulty": "EASY",
    "tags": ["Array", "Hash Table"],
    "examples": {},
    "constraints": "2 <= nums.length <= 10^4",
    "hints": "Try using a hash map",
    "testCases": [],
    "codeSnippets": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `404`: Problem not found

---

### Create Problem (Admin Only)
**POST** `/problems/create-problem`

Create a new coding problem.

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Two Sum",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "difficulty": "EASY",
  "tags": ["Array", "Hash Table"],
  "examples": {
    "example1": {
      "input": "[2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
    }
  },
  "constraints": "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
  "testCases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[0,1]"
    },
    {
      "input": "[3,2,4]\n6",
      "output": "[1,2]"
    }
  ],
  "codeSnippets": {
    "JAVASCRIPT": "function twoSum(nums, target) {\n    // Your code here\n}",
    "PYTHON": "def two_sum(nums, target):\n    # Your code here\n    pass",
    "JAVA": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n}",
    "PYTHON": "def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Problem created successfully",
  "problem": {
    "id": "uuid",
    "title": "Two Sum",
    // ... full problem object
  }
}
```

**Errors:**
- `401`: Unauthorized (not admin)
- `400`: Validation failed for reference solutions
- `400`: Judge0 API not available
- `500`: Failed to create problem

---

### Update Problem (Admin Only)
**PUT** `/problems/update-problem/:id`

Update an existing problem.

**Parameters:**
- `id` (string): Problem UUID

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:** Same as create problem

**Response (200):**
```json
{
  "success": true,
  "message": "Problem updated successfully",
  "problem": {
    // Updated problem object
  }
}
```

**Errors:**
- `404`: Problem not found
- `403`: Forbidden (not admin)
- `400`: Validation failed

---

### Delete Problem (Admin Only)
**DELETE** `/problems/delete-problem/:id`

Delete a problem and all related data.

**Parameters:**
- `id` (string): Problem UUID

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Problem deleted successfully"
}
```

**Errors:**
- `404`: Problem not found
- `403`: Forbidden (not admin)

---

### Get Solved Problems
**GET** `/problems/get-solved-problem`

Get all problems solved by the current user.

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Problems fetched successfully",
  "problems": [
    {
      "id": "uuid",
      "title": "Two Sum",
      "difficulty": "EASY",
      // ... problem details
      "solvedBy": [
        {
          "id": "uuid",
          "userId": "user-uuid",
          "problemId": "problem-uuid",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

---

## Code Execution Endpoints

### Test Code
**POST** `/execute-code/test`

Test code against problem test cases without creating a submission.

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "source_code": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n}",
  "language_id": 63,
  "stdin": ["[2,7,11,15]\n9", "[3,2,4]\n6"],
  "expected_outputs": ["[0,1]", "[1,2]"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Code tested successfully",
  "results": [
    {
      "testCase": 1,
      "passed": true,
      "stdout": "[0,1]",
      "expected": "[0,1]",
      "stderr": null,
      "compile_output": null,
      "status": "Accepted",
      "memory": "15.2 KB",
      "time": "0.001 s"
    },
    {
      "testCase": 2,
      "passed": true,
      "stdout": "[1,2]",
      "expected": "[1,2]",
      "stderr": null,
      "compile_output": null,
      "status": "Accepted",
      "memory": "15.4 KB",
      "time": "0.002 s"
    }
  ],
  "allPassed": true
}
```

**Errors:**
- `400`: Invalid or missing test cases
- `500`: Failed to test code

---

### Submit Code
**POST** `/execute-code`

Submit code for evaluation and create a submission record.

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "source_code": "function twoSum(nums, target) { /* solution */ }",
  "language_id": 63,
  "stdin": ["[2,7,11,15]\n9", "[3,2,4]\n6"],
  "expected_outputs": ["[0,1]", "[1,2]"],
  "problemId": "problem-uuid"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Code executed successfully",
  "submission": {
    "id": "submission-uuid",
    "userId": "user-uuid",
    "problemId": "problem-uuid",
    "language": "JavaScript",
    "sourceCode": "function twoSum(nums, target) { /* solution */ }",
    "status": "Accepted",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "testCases": [
      {
        "id": "test-case-uuid",
        "submissionId": "submission-uuid",
        "testCase": 1,
        "passed": true,
        "stdout": "[0,1]",
        "expected": "[0,1]",
        "status": "Accepted",
        "memory": "15.2 KB",
        "time": "0.001 s"
      }
    ]
  }
}
```

---

## Submission Endpoints

### Get All User Submissions
**GET** `/submissions/get-all-submissions`

Get all submissions made by the current user.

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Submissions fetched successfully",
  "submissions": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "problemId": "problem-uuid",
      "language": "JavaScript",
      "status": "Accepted",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "sourceCode": "function solution() { /* code */ }"
    }
  ]
}
```

---

### Get Problem Submissions
**GET** `/submissions/get-submissions/:problemId`

Get all submissions for a specific problem by the current user.

**Parameters:**
- `problemId` (string): Problem UUID

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Submissions fetched successfully",
  "submissions": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "problemId": "problem-uuid",
      "language": "JavaScript",
      "status": "Wrong Answer",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Submission Count
**GET** `/submissions/get-submissions-count/:problemId`

Get total submission count for a problem (all users).

**Parameters:**
- `problemId` (string): Problem UUID

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Submissions fetched successfully",
  "count": 1247
}
```

---

## Playlist Endpoints

### Get All Playlists
**GET** `/playlist`

Get all playlists created by the current user.

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Playlist fetched successfully",
  "playLists": [
    {
      "id": "uuid",
      "name": "Array Problems",
      "description": "Collection of array-based problems",
      "userId": "user-uuid",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "problems": [
        {
          "id": "uuid",
          "playlistId": "playlist-uuid",
          "problemId": "problem-uuid",
          "problem": {
            "id": "problem-uuid",
            "title": "Two Sum",
            "difficulty": "EASY"
          }
        }
      ]
    }
  ]
}
```

---

### Get Playlist Details
**GET** `/playlist/:playlistId`

Get detailed information about a specific playlist.

**Parameters:**
- `playlistId` (string): Playlist UUID

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Playlist fetched successfully",
  "playList": {
    "id": "uuid",
    "name": "Array Problems",
    "description": "Collection of array-based problems",
    "userId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "problems": [
      {
        "id": "uuid",
        "problem": {
          "id": "problem-uuid",
          "title": "Two Sum",
          "description": "Given an array...",
          "difficulty": "EASY",
          "tags": ["Array", "Hash Table"],
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      }
    ]
  }
}
```

**Errors:**
- `404`: Playlist not found or access denied

---

### Create Playlist
**POST** `/playlist/create-playlist`

Create a new playlist.

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "Dynamic Programming",
  "description": "Problems focusing on DP techniques"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Playlist created successfully",
  "playList": {
    "id": "uuid",
    "name": "Dynamic Programming",
    "description": "Problems focusing on DP techniques",
    "userId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `400`: Playlist name is required
- `400`: A playlist with this name already exists

---

### Add Problems to Playlist
**POST** `/playlist/:playlistId/add-problem`

Add one or more problems to a playlist.

**Parameters:**
- `playlistId` (string): Playlist UUID

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "problemIds": ["problem-uuid-1", "problem-uuid-2"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "2 problem(s) added to playlist successfully",
  "problemsInPlaylist": {},
  "addedCount": 2,
  "skippedCount": 0
}
```

**Errors:**
- `400`: Invalid or missing problemIds
- `404`: Playlist not found or access denied
- `400`: All selected problems are already in this playlist

---

### Remove Problems from Playlist
**DELETE** `/playlist/:playlistId/remove-problem`

Remove problems from a playlist.

**Parameters:**
- `playlistId` (string): Playlist UUID

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "problemIds": ["problem-uuid-1", "problem-uuid-2"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Problem removed from playlist successfully",
  "deletedProblem": {}
}
```

---

### Delete Playlist
**DELETE** `/playlist/:playlistId`

Delete a playlist and all its associations.

**Parameters:**
- `playlistId` (string): Playlist UUID

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Playlist deleted successfully",
  "deletedPlaylist": {}
}
```

---

## Chatbot Endpoints

### Chat with AI
**POST** `/chatbot/chat`

Send a message to the AI chatbot for problem assistance.

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "message": "Can you give me a hint for solving this problem?",
  "problemContext": {
    "id": "problem-uuid",
    "title": "Two Sum",
    "description": "Given an array of integers...",
    "examples": {},
    "testCases": [],
    "startCode": "function twoSum(nums, target) { }"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Response generated successfully",
  "response": "Here's a hint for the Two Sum problem: Consider using a hash map to store the numbers you've seen so far along with their indices. For each number, check if its complement (target - current number) exists in the hash map. This approach can solve the problem in O(n) time complexity."
}
```

**Errors:**
- `400`: Message is required
- `400`: Gemini API key not configured
- `500`: Failed to generate response

---

### Get Chat History
**GET** `/chatbot/history/:problemId`

Get chat history for a specific problem.

**Parameters:**
- `problemId` (string): Problem UUID

**Headers:** `Cookie: jwt=<token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Chat history retrieved successfully",
  "chatHistory": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "problemId": "problem-uuid",
      "message": "Can you give me a hint?",
      "response": "Here's a hint...",
      "messageType": "general",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Save Chat Message
**POST** `/chatbot/save`

Save a chat message to the database.

**Headers:** 
- `Cookie: jwt=<token>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "problemId": "problem-uuid",
  "message": "Can you review my code?",
  "response": "Your code looks good, but...",
  "messageType": "code_review"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Chat message saved successfully",
  "chatMessage": {
    "id": "uuid",
    "userId": "user-uuid",
    "problemId": "problem-uuid",
    "message": "Can you review my code?",
    "response": "Your code looks good, but...",
    "messageType": "code_review",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production deployment to prevent abuse.

## CORS Configuration

The API is configured to accept requests from `http://localhost:5173` (frontend development server). Update CORS settings for production deployment.

---

For more detailed implementation information, refer to the controller files in the `src/controllers/` directory.