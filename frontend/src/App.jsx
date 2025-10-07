import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

import ProblemPage from "./pages/ProblemPage";
import Layout from "./components/Layout";

import AddProblem from "./pages/AddProblem";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();



  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-start">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--b1))',
              color: 'hsl(var(--bc))',
              border: '1px solid hsl(var(--b3))',
            },
          }}
        />
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <Dashboard /> : <LandingPage />}
          />
          <Route
            path="/problems"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/problem/:id"
            element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={authUser ? <Settings /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/login" />}
          />
        </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
