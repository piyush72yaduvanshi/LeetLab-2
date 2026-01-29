# LeetCode Clone Frontend Documentation

## Overview

This is a modern React-based frontend for a LeetCode-style coding platform. Built with Vite, React 19, and Tailwind CSS, it provides a comprehensive user interface for solving coding problems, managing submissions, creating playlists, and interacting with an AI-powered coding assistant.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Architecture](#architecture)
4. [State Management](#state-management)
5. [Routing System](#routing-system)
6. [Component Library](#component-library)
7. [Pages Overview](#pages-overview)
8. [Styling System](#styling-system)
9. [Code Editor Integration](#code-editor-integration)
10. [API Integration](#api-integration)
11. [Authentication Flow](#authentication-flow)
12. [Installation & Setup](#installation--setup)
13. [Development Guidelines](#development-guidelines)
14. [Build & Deployment](#build--deployment)

## Technology Stack

### Core Technologies
- **React**: 19.0.0 - UI library with latest features
- **Vite**: 6.2.0 - Fast build tool and development server
- **TypeScript**: Not used (JavaScript-only project)
- **React Router**: 7.5.0 - Client-side routing

### State Management
- **Zustand**: 5.0.3 - Lightweight state management

### Styling & UI
- **Tailwind CSS**: 4.1.3 - Utility-first CSS framework
- **DaisyUI**: 5.0.18 - Tailwind CSS component library
- **Lucide React**: 0.487.0 - Icon library
- **Framer Motion**: 12.7.4 - Animation library

### Code Editor
- **Monaco Editor**: 4.7.0 - VS Code editor for the web

### Form Handling
- **React Hook Form**: 7.55.0 - Form state management
- **Zod**: 3.24.2 - Schema validation
- **Hookform Resolvers**: 5.0.1 - Form validation integration

### HTTP & Utilities
- **Axios**: 1.8.4 - HTTP client
- **React Hot Toast**: 2.5.2 - Toast notifications

## Project Structure

```
frontend/
├── public/                    # Static assets
│   ├── logo.svg
│   ├── leetlab.svg
│   └── thumbnail.png
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AddProblemForm.jsx
│   │   ├── AddToPlaylist.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── AuthImagePattern.jsx
│   │   ├── Chatbot.jsx
│   │   ├── CreatePlaylistModal.jsx
│   │   ├── EnhancedCodeEditor.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Layout.jsx
│   │   ├── LazyLoader.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── LogoutButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── PlaylistProfile.jsx
│   │   ├── ProblemCard.jsx
│   │   ├── ProblemSolvedByUser.jsx
│   │   ├── ProblemTable.jsx
│   │   ├── ProfileSubmission.jsx
│   │   ├── SampleProblemSelector.jsx
│   │   ├── Submission.jsx
│   │   └── SubmissionList.jsx
│   ├── pages/               # Page components
│   │   ├── AddProblem.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HomePage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProblemPage.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── SignUpPage.jsx
│   ├── store/               # Zustand state stores
│   │   ├── useActions.js
│   │   ├── useAuthStore.js
│   │   ├── useChatbotStore.js
│   │   ├── useExecution.js
│   │   ├── usePlaylistStore.js
│   │   ├── useProblemStore.js
│   │   └── useSubmissionStore.js
│   ├── libs/                # Utility functions
│   │   ├── axios.js
│   │   └── utils.js
│   ├── data/                # Static data
│   │   └── index.js
│   ├── assets/              # Images and static assets
│   │   └── react.svg
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── .env.local              # Environment variables
```

## Architecture

The frontend follows a component-based architecture with clear separation of concerns:

```
┌─────────────────┐
│     Pages       │ ← Route-level components
├─────────────────┤
│   Components    │ ← Reusable UI components
├─────────────────┤
│   Store (Zustand)│ ← Global state management
├─────────────────┤
│     Libs        │ ← Utilities and API client
├─────────────────┤
│   API Layer     │ ← Axios HTTP client
└─────────────────┘
```

### Design Patterns

1. **Component Composition**: Building complex UIs from smaller, reusable components
2. **Custom Hooks**: Encapsulating stateful logic in custom hooks
3. **State Management**: Centralized state with Zustand stores
4. **Error Boundaries**: Graceful error handling with React Error Boundaries
5. **Lazy Loading**: Code splitting for better performance

## State Management

The application uses Zustand for state management with separate stores for different domains:

### Authentication Store (`useAuthStore`)

```javascript
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => { /* ... */ },
  signup: async (data) => { /* ... */ },
  login: async (data) => { /* ... */ },
  logout: async () => { /* ... */ }
}));
```

**Features:**
- User authentication state
- Login/signup/logout actions
- Authentication status checking
- Loading states for UI feedback

### Problem Store (`useProblemStore`)

```javascript
export const useProblemStore = create((set, get) => ({
  isProblemLoading: false,
  isProblemsLoading: false,
  problems: [],
  problem: null,
  solvedProblems: [],

  getAllProblems: async () => { /* ... */ },
  getProblemById: async (id) => { /* ... */ },
  getSolvedProblemByUser: async () => { /* ... */ }
}));
```

**Features:**
- Problem list management
- Individual problem details
- User's solved problems tracking
- Loading states for different operations

### Execution Store (`useExecutionStore`)

```javascript
export const useExecutionStore = create((set) => ({
  isExecuting: false,
  isSubmitting: false,
  submission: null,
  testResults: null,

  testCode: async (source_code, language_id, stdin, expected_outputs) => { /* ... */ },
  executeCode: async (source_code, language_id, stdin, expected_outputs, problemId) => { /* ... */ },
  clearTestResults: () => { /* ... */ },
  clearSubmission: () => { /* ... */ }
}));
```

**Features:**
- Code testing without submission
- Code submission with result tracking
- Test results management
- Execution state tracking

### Playlist Store (`usePlaylistStore`)

```javascript
export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  createPlaylist: async (playlistData) => { /* ... */ },
  getAllPlaylists: async () => { /* ... */ },
  getPlaylistDetails: async (playlistId) => { /* ... */ },
  addProblemToPlaylist: async (playlistId, problemIds) => { /* ... */ },
  removeProblemFromPlaylist: async (playlistId, problemIds) => { /* ... */ },
  deletePlaylist: async (playlistId) => { /* ... */ }
}));
```

**Features:**
- Playlist CRUD operations
- Problem-playlist associations
- Error handling and loading states
- Optimistic updates

### Submission Store (`useSubmissionStore`)

```javascript
export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => { /* ... */ },
  getSubmissionForProblem: async (problemId) => { /* ... */ },
  getSubmissionCountForProblem: async (problemId) => { /* ... */ }
}));
```

**Features:**
- User submission history
- Problem-specific submissions
- Submission statistics
- Loading state management

### Chatbot Store (`useChatbotStore`)

```javascript
export const useChatbotStore = create((set, get) => ({
  isLoading: false,
  messages: [],
  chatHistory: [],

  sendMessage: async (message, problemContext) => { /* ... */ },
  getChatHistory: async (problemId) => { /* ... */ },
  clearChat: () => { /* ... */ },
  sendQuickAction: async (action, problemContext, userCode) => { /* ... */ }
}));
```

**Features:**
- AI chatbot interactions
- Message history management
- Quick action shortcuts
- Problem-specific context

## Routing System

The application uses React Router v7 with nested routes and protection:

```javascript
// App.jsx - Route Configuration
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={authUser ? <Dashboard /> : <LandingPage />} />
    <Route path="/problems" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
    <Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to="/login" />} />
    <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
    <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
  </Route>
  
  <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
  <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
  
  <Route element={<AdminRoute />}>
    <Route path="/add-problem" element={authUser ? <AddProblem /> : <Navigate to="/login" />} />
  </Route>
</Routes>
```

### Route Protection

1. **Authentication Protection**: Redirects unauthenticated users to login
2. **Admin Protection**: Restricts admin-only routes using `AdminRoute` component
3. **Conditional Routing**: Shows different content based on authentication status

### Layout System

The `Layout` component provides consistent navigation and structure:

```javascript
// Layout.jsx
const Layout = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
```

## Component Library

### Core Components

#### EnhancedCodeEditor
Advanced code editor with Monaco Editor integration:

```javascript
const EnhancedCodeEditor = ({
  code,
  onChange,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  isExecuting,
  isSubmitting,
  problem
}) => {
  // Monaco Editor configuration
  // Language selection
  // Run/Submit buttons
  // Syntax highlighting
  // Auto-completion
};
```

**Features:**
- Multi-language support (JavaScript, Python, Java, C++, Go, TypeScript)
- Syntax highlighting and auto-completion
- Integrated run/submit functionality
- Responsive design
- Theme support

#### Chatbot
AI-powered coding assistant:

```javascript
const Chatbot = ({ problem, userCode }) => {
  // Message interface
  // Quick action buttons
  // Chat history
  // Problem context integration
};
```

**Features:**
- Real-time AI assistance
- Problem-specific context
- Quick action shortcuts (hints, solutions, code review)
- Message history persistence
- Responsive chat interface

#### ProblemTable
Comprehensive problem listing with filtering:

```javascript
const ProblemsTable = ({ problems, searchTerm, selectedDifficulty }) => {
  // Problem filtering
  // Difficulty badges
  // Solved status indicators
  // Pagination
  // Sorting capabilities
};
```

**Features:**
- Search and filter functionality
- Difficulty-based filtering
- Solved status tracking
- Responsive table design
- Problem statistics

### Form Components

#### AddProblemForm
Admin interface for creating problems:

```javascript
const AddProblemForm = () => {
  // Multi-step form
  // Code snippet management
  // Test case creation
  // Reference solution validation
};
```

**Features:**
- Multi-language code snippet support
- Dynamic test case management
- Reference solution validation
- Rich text editing for descriptions
- Form validation with error handling

### Navigation Components

#### Navbar
Main navigation with user menu:

```javascript
const Navbar = () => {
  // Authentication status
  // User profile menu
  // Navigation links
  // Mobile responsiveness
};
```

**Features:**
- Responsive design
- User authentication status
- Profile dropdown menu
- Mobile hamburger menu
- Theme switching

## Pages Overview

### Dashboard
User's main dashboard with statistics and quick actions:

**Features:**
- Problem solving statistics
- Recent activity feed
- Progress tracking
- Quick navigation to problems
- Achievement badges
- Difficulty breakdown charts

### HomePage (Problems List)
Browse and filter coding problems:

**Features:**
- Problem search and filtering
- Difficulty-based categorization
- Solved status indicators
- Problem statistics
- Responsive grid/table layout

### ProblemPage
Individual problem solving interface:

**Features:**
- Problem description with examples
- Integrated code editor
- Test case execution
- Submission history
- AI chatbot assistance
- Multiple programming languages
- Real-time feedback

### Profile
User profile and progress tracking:

**Features:**
- User information display
- Submission history
- Solved problems list
- Playlist management
- Statistics and achievements
- Progress visualization

### AddProblem (Admin)
Admin interface for problem creation:

**Features:**
- Rich problem description editor
- Multi-language code snippets
- Test case management
- Reference solution validation
- Problem metadata configuration

## Styling System

### Tailwind CSS Configuration

```javascript
// tailwind.config.js (implied configuration)
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: [require("daisyui")]
}
```

### DaisyUI Components

The application leverages DaisyUI for consistent component styling:

- **Cards**: Problem cards, submission cards, profile cards
- **Buttons**: Primary, secondary, outline, ghost variants
- **Forms**: Input fields, selects, textareas with validation states
- **Navigation**: Navbar, breadcrumbs, pagination
- **Feedback**: Alerts, toasts, loading spinners, progress bars
- **Layout**: Containers, grids, flexbox utilities

### Theme System

```css
/* index.css - Global styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component styles */
.code-editor {
  @apply border border-base-300 rounded-lg overflow-hidden;
}

.problem-card {
  @apply card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow;
}
```

### Responsive Design

The application uses Tailwind's responsive utilities:

- **Mobile-first**: Base styles for mobile devices
- **Tablet**: `md:` prefix for tablet-specific styles
- **Desktop**: `lg:` and `xl:` prefixes for larger screens
- **Flexible layouts**: CSS Grid and Flexbox for adaptive layouts

## Code Editor Integration

### Monaco Editor Setup

```javascript
// EnhancedCodeEditor.jsx
import Editor from '@monaco-editor/react';

const EnhancedCodeEditor = ({ code, onChange, language }) => {
  return (
    <Editor
      height="400px"
      language={language}
      value={code}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on'
      }}
    />
  );
};
```

### Language Support

Supported programming languages:
- **JavaScript**: Node.js runtime
- **Python**: Python 3.x
- **Java**: Java 8+
- **C++**: C++17
- **Go**: Go 1.x
- **TypeScript**: TypeScript 4.x

### Editor Features

- **Syntax Highlighting**: Language-specific syntax coloring
- **Auto-completion**: IntelliSense-like code completion
- **Error Detection**: Real-time syntax error highlighting
- **Code Formatting**: Automatic code formatting
- **Themes**: Dark and light theme support
- **Keyboard Shortcuts**: VS Code-like shortcuts

## API Integration

### Axios Configuration

```javascript
// libs/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASEURL || "http://localhost:8080/api/v1",
  withCredentials: true, // Include cookies for authentication
});
```

### API Client Pattern

Each store encapsulates API calls:

```javascript
// Example API call in store
const getAllProblems = async () => {
  try {
    set({ isProblemsLoading: true });
    const res = await axiosInstance.get("/problems/get-all-problems");
    set({ problems: res.data.problems });
  } catch (error) {
    console.log("Error getting all problems", error);
    toast.error("Error getting all problems");
  } finally {
    set({ isProblemsLoading: false });
  }
};
```

### Error Handling

Consistent error handling across the application:

1. **Network Errors**: Axios interceptors for network-level errors
2. **API Errors**: Store-level error handling with user feedback
3. **Validation Errors**: Form-level validation with field-specific errors
4. **Toast Notifications**: User-friendly error messages

## Authentication Flow

### Authentication States

```javascript
// useAuthStore.js
const authStates = {
  CHECKING: 'isCheckingAuth',
  SIGNING_UP: 'isSigninUp',
  LOGGING_IN: 'isLoggingIn',
  AUTHENTICATED: 'authUser !== null',
  UNAUTHENTICATED: 'authUser === null'
};
```

### Authentication Flow

1. **App Initialization**: Check existing authentication on app load
2. **Login Process**: Email/password authentication with JWT cookies
3. **Route Protection**: Redirect unauthenticated users to login
4. **Logout Process**: Clear authentication state and redirect
5. **Token Refresh**: Automatic token validation on API calls

### Protected Routes

```javascript
// Route protection pattern
const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  
  if (isCheckingAuth) return <LoadingSpinner />;
  if (!authUser) return <Navigate to="/login" />;
  
  return children;
};
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server running

### Installation Steps

1. **Clone and install dependencies**:
```bash
cd frontend
npm install
```

2. **Environment configuration**:
```bash
# Create .env.local file
echo "VITE_BACKEND_API_BASEURL=http://localhost:8080/api/v1" > .env.local
```

3. **Start development server**:
```bash
npm run dev
```

4. **Access the application**:
```
http://localhost:5173
```

### Environment Variables

```bash
# .env.local
VITE_BACKEND_API_BASEURL=http://localhost:8080/api/v1
```

## Development Guidelines

### Code Style

1. **Component Structure**: Functional components with hooks
2. **File Naming**: PascalCase for components, camelCase for utilities
3. **Import Order**: External libraries, internal components, utilities
4. **Props Destructuring**: Destructure props in function parameters
5. **Event Handlers**: Use descriptive handler names (handleSubmit, onUserClick)

### Component Best Practices

```javascript
// Good component structure
const ProblemCard = ({ problem, onSolve, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  return (
    <div className="card bg-base-100 shadow-xl">
      {/* Component content */}
    </div>
  );
};

export default ProblemCard;
```

### State Management Guidelines

1. **Store Separation**: Separate stores for different domains
2. **Action Naming**: Use descriptive action names
3. **Loading States**: Include loading states for async operations
4. **Error Handling**: Consistent error handling patterns
5. **Optimistic Updates**: Update UI optimistically where appropriate

### Performance Optimization

1. **Code Splitting**: Use React.lazy for route-level code splitting
2. **Memoization**: Use React.memo for expensive components
3. **Callback Optimization**: Use useCallback for event handlers
4. **Effect Dependencies**: Minimize useEffect dependencies
5. **Bundle Analysis**: Regular bundle size analysis

## Build & Deployment

### Build Process

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Build Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          editor: ['@monaco-editor/react']
        }
      }
    }
  }
})
```

### Deployment Considerations

1. **Environment Variables**: Configure production API URLs
2. **Static Assets**: Optimize images and static files
3. **CDN**: Use CDN for static asset delivery
4. **Caching**: Configure proper caching headers
5. **Error Monitoring**: Implement error tracking (Sentry, etc.)
6. **Analytics**: Add user analytics if needed

### Production Optimizations

1. **Bundle Splitting**: Separate vendor and application code
2. **Tree Shaking**: Remove unused code
3. **Minification**: Minify JavaScript and CSS
4. **Compression**: Enable gzip/brotli compression
5. **Service Worker**: Consider PWA features

---

This documentation provides a comprehensive overview of the LeetCode Clone frontend architecture and implementation. For specific component details, refer to the individual source files and inline comments.