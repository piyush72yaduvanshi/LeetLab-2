# Component Documentation

## Overview

This document provides detailed information about all React components in the LeetCode Clone frontend application. Components are organized by category and include usage examples, props documentation, and implementation details.

## Table of Contents

1. [Core Components](#core-components)
2. [Page Components](#page-components)
3. [Form Components](#form-components)
4. [Navigation Components](#navigation-components)
5. [UI Components](#ui-components)
6. [Utility Components](#utility-components)

---

## Core Components

### EnhancedCodeEditor

Advanced code editor component built with Monaco Editor for coding problem solutions.

**Location**: `src/components/EnhancedCodeEditor.jsx`

**Props**:
```javascript
{
  code: string,              // Current code content
  onChange: function,        // Code change handler
  language: string,          // Programming language
  onLanguageChange: function, // Language change handler
  onRun: function,           // Run code handler
  onSubmit: function,        // Submit code handler
  isExecuting: boolean,      // Execution loading state
  isSubmitting: boolean,     // Submission loading state
  problem: object           // Problem context for editor
}
```

**Features**:
- Multi-language support (JavaScript, Python, Java, C++, Go, TypeScript)
- Syntax highlighting and auto-completion
- Integrated run/submit buttons
- Responsive design with mobile support
- Theme switching (dark/light)
- Code formatting and error detection

**Usage Example**:
```javascript
<EnhancedCodeEditor
  code={userCode}
  onChange={setUserCode}
  language="javascript"
  onLanguageChange={handleLanguageChange}
  onRun={handleRunCode}
  onSubmit={handleSubmitCode}
  isExecuting={isExecuting}
  isSubmitting={isSubmitting}
  problem={currentProblem}
/>
```

---

### Chatbot

AI-powered coding assistant for providing hints, solutions, and code reviews.

**Location**: `src/components/Chatbot.jsx`

**Props**:
```javascript
{
  problem: object,    // Current problem context
  userCode: string   // User's current code for review
}
```

**Features**:
- Real-time AI assistance using Gemini API
- Problem-specific context awareness
- Quick action buttons (hints, solutions, code review)
- Message history with persistence
- Responsive chat interface
- Message type indicators (user/bot/error)

**Usage Example**:
```javascript
<Chatbot 
  problem={currentProblem}
  userCode={editorCode}
/>
```

**Internal State**:
- `messages`: Array of chat messages
- `isLoading`: Loading state for AI responses
- `inputMessage`: Current input message

---

### ProblemTable

Comprehensive table component for displaying and filtering coding problems.

**Location**: `src/components/ProblemTable.jsx`

**Props**:
```javascript
{
  problems: array,           // Array of problem objects
  searchTerm: string,        // Search filter term
  selectedDifficulty: string // Difficulty filter
}
```

**Features**:
- Search functionality by problem title
- Difficulty-based filtering (Easy, Medium, Hard)
- Solved status indicators
- Responsive table design
- Problem statistics display
- Direct navigation to problem pages

**Usage Example**:
```javascript
<ProblemTable
  problems={allProblems}
  searchTerm={searchQuery}
  selectedDifficulty={difficultyFilter}
/>
```

---

## Page Components

### Dashboard

Main dashboard page showing user statistics and recent activity.

**Location**: `src/pages/Dashboard.jsx`

**Features**:
- User progress statistics
- Problem solving metrics
- Recent submission activity
- Quick action buttons
- Achievement badges
- Difficulty breakdown charts
- Responsive grid layout

**Key Sections**:
- Welcome header with user name
- Statistics cards (solved, accuracy, streak, weekly activity)
- Progress overview with difficulty breakdown
- Recent activity feed
- Quick actions sidebar

---

### HomePage

Problems listing page with search and filter capabilities.

**Location**: `src/pages/HomePage.jsx`

**Features**:
- Problem search by title
- Difficulty filtering
- Statistics overview
- Responsive problem grid
- Loading states
- Empty state handling

**State Management**:
- Uses `useProblemStore` for problem data
- Local state for search and filter terms
- Loading state management

---

### ProblemPage

Individual problem solving interface with integrated editor and AI assistance.

**Location**: `src/pages/ProblemPage.jsx`

**Features**:
- Problem description with examples and constraints
- Tabbed interface (Description, Submissions, Discussion, Hints)
- Integrated code editor with multi-language support
- Test case execution and results display
- Submission history
- AI chatbot integration
- Bookmark functionality

**URL Parameters**:
- `id`: Problem UUID from route parameters

**Key Sections**:
- Problem header with metadata
- Tabbed content area
- Code editor panel
- Test results/submission display
- AI chatbot panel

---

### Profile

User profile page with submission history and statistics.

**Location**: `src/pages/Profile.jsx`

**Features**:
- User information display
- Tabbed interface (Overview, Submissions, Solved Problems, Playlists)
- Statistics cards
- Achievement display
- Profile editing capabilities
- Responsive design

**Tabs**:
- **Overview**: Personal information and achievements
- **Submissions**: Complete submission history
- **Solved Problems**: List of successfully solved problems
- **Playlists**: User-created problem collections

---

### AddProblem (Admin)

Admin interface for creating and managing coding problems.

**Location**: `src/pages/AddProblem.jsx`

**Features**:
- Rich text editor for problem descriptions
- Multi-language code snippet management
- Dynamic test case creation
- Reference solution validation
- Problem metadata configuration
- Form validation and error handling

**Access Control**:
- Protected by `AdminRoute` component
- Only accessible to users with ADMIN role

---

## Form Components

### AddProblemForm

Comprehensive form for creating coding problems (admin only).

**Location**: `src/components/AddProblemForm.jsx`

**Features**:
- Multi-step form interface
- Rich text editing for descriptions
- Code snippet editor for multiple languages
- Dynamic test case management
- Reference solution validation with Judge0
- Form validation with error display

**Form Sections**:
1. Basic Information (title, description, difficulty)
2. Examples and Constraints
3. Test Cases
4. Code Snippets
5. Reference Solutions

---

### CreatePlaylistModal

Modal component for creating new playlists.

**Location**: `src/components/CreatePlaylistModal.jsx`

**Props**:
```javascript
{
  isOpen: boolean,        // Modal visibility state
  onClose: function,      // Close modal handler
  onSubmit: function     // Form submission handler
}
```

**Features**:
- Form validation
- Error handling
- Loading states
- Responsive modal design

---

### AddToPlaylist

Component for adding problems to existing playlists.

**Location**: `src/components/AddToPlaylist.jsx`

**Props**:
```javascript
{
  problemIds: array,      // Array of problem IDs to add
  onSuccess: function    // Success callback
}
```

**Features**:
- Playlist selection dropdown
- Bulk problem addition
- Success/error feedback
- Loading states

---

## Navigation Components

### Navbar

Main navigation bar with user authentication and menu.

**Location**: `src/components/Navbar.jsx`

**Features**:
- Responsive design with mobile hamburger menu
- User authentication status display
- Profile dropdown menu
- Navigation links
- Logo and branding
- Theme switching capabilities

**Navigation Items**:
- Dashboard
- Problems
- Profile
- Settings
- Admin Panel (for admin users)

---

### Layout

Main layout wrapper providing consistent structure.

**Location**: `src/components/Layout.jsx`

**Features**:
- Consistent page structure
- Navigation integration
- Outlet for nested routes
- Responsive design
- Global styling application

**Structure**:
```javascript
<div className="min-h-screen bg-base-100">
  <Navbar />
  <main>
    <Outlet />
  </main>
</div>
```

---

### AdminRoute

Route protection component for admin-only pages.

**Location**: `src/components/AdminRoute.jsx`

**Features**:
- Role-based access control
- Automatic redirection for non-admin users
- Loading state handling
- Error boundary integration

---

## UI Components

### ProblemCard

Card component for displaying problem information in grid layouts.

**Location**: `src/components/ProblemCard.jsx`

**Props**:
```javascript
{
  problem: object,        // Problem data object
  onSolve: function,     // Solve button handler
  isLoading: boolean     // Loading state
}
```

**Features**:
- Difficulty badge with color coding
- Solved status indicator
- Tag display
- Hover effects
- Responsive design

---

### Submission

Component for displaying individual submission details.

**Location**: `src/components/Submission.jsx`

**Props**:
```javascript
{
  submission: object     // Submission data object
}
```

**Features**:
- Status badge (Accepted, Wrong Answer, etc.)
- Language indicator
- Execution time and memory usage
- Test case results breakdown
- Code display with syntax highlighting

---

### SubmissionList

List component for displaying multiple submissions.

**Location**: `src/components/SubmissionList.jsx`

**Props**:
```javascript
{
  submissions: array,    // Array of submission objects
  isLoading: boolean    // Loading state
}
```

**Features**:
- Tabular submission display
- Status filtering
- Sorting capabilities
- Pagination support
- Empty state handling

---

### LoadingSpinner

Reusable loading indicator component.

**Location**: `src/components/LoadingSpinner.jsx`

**Props**:
```javascript
{
  size: string,          // Spinner size (sm, md, lg)
  message: string       // Optional loading message
}
```

**Features**:
- Multiple size variants
- Customizable loading messages
- Consistent styling with DaisyUI
- Accessibility support

---

### ErrorBoundary

Error boundary component for graceful error handling.

**Location**: `src/components/ErrorBoundary.jsx`

**Features**:
- Catches JavaScript errors in component tree
- Displays fallback UI
- Error logging capabilities
- Recovery mechanisms

**Usage**:
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## Utility Components

### LazyLoader

Component for implementing lazy loading with suspense.

**Location**: `src/components/LazyLoader.jsx`

**Features**:
- Code splitting support
- Loading fallback UI
- Error boundary integration
- Performance optimization

---

### AuthImagePattern

Decorative component for authentication pages.

**Location**: `src/components/AuthImagePattern.jsx`

**Features**:
- Responsive background patterns
- Theme-aware styling
- Animation effects
- Mobile optimization

---

### LogoutButton

Specialized button component for user logout functionality.

**Location**: `src/components/LogoutButton.jsx`

**Features**:
- Confirmation dialog
- Loading state during logout
- Error handling
- Consistent styling

---

### SampleProblemSelector

Component for selecting sample problems during problem creation.

**Location**: `src/components/SampleProblemSelector.jsx`

**Props**:
```javascript
{
  onSelect: function,    // Selection handler
  selectedIds: array    // Currently selected problem IDs
}
```

**Features**:
- Problem search and filtering
- Multi-select functionality
- Preview capabilities
- Responsive design

---

## Component Patterns

### Common Props Pattern

Most components follow consistent prop patterns:

```javascript
// Standard component props
{
  className: string,     // Additional CSS classes
  children: node,        // Child components
  isLoading: boolean,    // Loading state
  error: string,         // Error message
  onAction: function     // Event handlers
}
```

### State Management Pattern

Components use consistent state management:

```javascript
const Component = () => {
  // Local state
  const [localState, setLocalState] = useState(initialValue);
  
  // Global state from stores
  const { data, isLoading, error, actions } = useStore();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  return (
    // JSX
  );
};
```

### Error Handling Pattern

Components implement consistent error handling:

```javascript
const ComponentWithErrorHandling = () => {
  const [error, setError] = useState(null);
  
  const handleAsyncAction = async () => {
    try {
      setError(null);
      await asyncOperation();
    } catch (err) {
      setError(err.message);
      toast.error('Operation failed');
    }
  };
  
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  
  return <NormalComponent />;
};
```

---

## Styling Guidelines

### CSS Class Patterns

Components use consistent Tailwind CSS patterns:

```javascript
// Layout classes
"flex items-center justify-between"
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
"container mx-auto px-4 py-8"

// Component classes
"card bg-base-100 shadow-xl"
"btn btn-primary"
"input input-bordered"

// State classes
"loading loading-spinner"
"alert alert-error"
"badge badge-success"
```

### Responsive Design

All components implement mobile-first responsive design:

```javascript
// Mobile-first approach
"text-sm md:text-base lg:text-lg"
"p-2 md:p-4 lg:p-6"
"hidden md:block"
"flex-col md:flex-row"
```

---

## Testing Considerations

### Component Testing

Components should be tested for:

1. **Rendering**: Correct rendering with different props
2. **Interactions**: User interactions and event handling
3. **State Changes**: State updates and side effects
4. **Error Handling**: Error states and recovery
5. **Accessibility**: ARIA labels and keyboard navigation

### Testing Example

```javascript
// Example test structure
describe('ProblemCard', () => {
  it('renders problem information correctly', () => {
    // Test implementation
  });
  
  it('handles solve button click', () => {
    // Test implementation
  });
  
  it('displays loading state', () => {
    // Test implementation
  });
});
```

---

This component documentation provides a comprehensive overview of all React components in the application. For implementation details, refer to the individual component source files.