import React from "react";
import { 
  User, 
  Code, 
  LogOut, 
  Home, 
  BookOpen, 
  Trophy, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/problems", label: "Problems", icon: Code },
    { path: "/profile", label: "Profile", icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full py-3 px-4">
      <div className="flex w-full justify-between items-center mx-auto max-w-7xl bg-base-100/80 backdrop-blur-lg border border-base-300/20 shadow-lg p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
            LeetLab
          </span>
        </Link>

        {/* Desktop Navigation */}
        {authUser && (
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn btn-ghost gap-2 ${
                    isActive(item.path) 
                      ? 'bg-primary text-primary-content' 
                      : 'hover:bg-primary/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* User Profile and Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {authUser && (
            <button
              className="btn btn-ghost btn-square md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* User Dropdown */}
          {authUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                  <img
                    src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                    alt="User Avatar"
                    className="object-cover"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-300/20"
              >
                {/* User Info */}
                <li className="menu-title">
                  <div className="flex items-center gap-3 p-2">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={authUser?.image || "https://avatar.iran.liara.run/public/boy"} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-base">{authUser?.name}</p>
                      <p className="text-sm text-base-content/60">{authUser?.email}</p>
                      <div className={`badge badge-sm ${authUser?.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'}`}>
                        {authUser?.role}
                      </div>
                    </div>
                  </div>
                </li>
                
                <div className="divider my-1"></div>

                {/* Navigation Links */}
                <li>
                  <Link to="/profile" className="gap-3 p-3 hover:bg-primary/10 rounded-lg">
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                </li>
                
                <li>
                  <Link to="/settings" className="gap-3 p-3 hover:bg-primary/10 rounded-lg">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>

                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link to="/add-problem" className="gap-3 p-3 hover:bg-primary/10 rounded-lg">
                      <Code className="w-4 h-4" />
                      Add Problem
                    </Link>
                  </li>
                )}

                <div className="divider my-1"></div>

                <li>
                  <LogoutButton className="gap-3 p-3 hover:bg-error/10 text-error rounded-lg">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {authUser && isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4">
          <div className="bg-base-100/90 backdrop-blur-lg border border-base-300/20 rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`btn btn-ghost justify-start gap-3 ${
                      isActive(item.path) 
                        ? 'bg-primary text-primary-content' 
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
