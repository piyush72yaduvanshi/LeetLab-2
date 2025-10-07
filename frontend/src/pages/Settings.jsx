import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Palette,
  Code,
  Globe,
  Save,
  Eye,
  EyeOff,
  Camera,
  Trash2
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Settings = () => {
  const { authUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name || '',
    email: authUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: false,
      submissions: true,
      achievements: true
    },
    preferences: {
      theme: 'dark',
      language: 'javascript',
      fontSize: 14,
      autoSave: true,
      showHints: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'coding', label: 'Coding Settings', icon: Code }
  ];

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving settings:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile" className="btn btn-ghost btn-circle">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-base-content/60">Manage your account preferences and settings</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-8">
              <div className="card-body p-4">
                <ul className="menu menu-compact">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-3 ${
                            activeTab === tab.id ? 'active bg-primary text-primary-content' : ''
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <User className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Profile Settings</h2>
                    </div>

                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <div className="avatar">
                        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img 
                            src={authUser?.image || "https://avatar.iran.liara.run/public/boy"} 
                            alt="Profile"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button className="btn btn-primary btn-sm gap-2">
                          <Camera className="w-4 h-4" />
                          Change Photo
                        </button>
                        <button className="btn btn-outline btn-sm gap-2">
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered"
                          value={formData.name}
                          onChange={(e) => handleInputChange(null, 'name', e.target.value)}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                          type="email"
                          className="input input-bordered"
                          value={formData.email}
                          onChange={(e) => handleInputChange(null, 'email', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Bio</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Shield className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Security Settings</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Current Password</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="input input-bordered w-full pr-10"
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange(null, 'currentPassword', e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">New Password</span>
                        </label>
                        <input
                          type="password"
                          className="input input-bordered"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange(null, 'newPassword', e.target.value)}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Confirm New Password</span>
                        </label>
                        <input
                          type="password"
                          className="input input-bordered"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange(null, 'confirmPassword', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="alert alert-info">
                      <div>
                        <h3 className="font-bold">Password Requirements:</h3>
                        <ul className="list-disc list-inside text-sm mt-2">
                          <li>At least 8 characters long</li>
                          <li>Contains uppercase and lowercase letters</li>
                          <li>Contains at least one number</li>
                          <li>Contains at least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Bell className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Notification Settings</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Email Notifications</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={formData.notifications.email}
                            onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                          />
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Push Notifications</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={formData.notifications.push}
                            onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
                          />
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Submission Results</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={formData.notifications.submissions}
                            onChange={(e) => handleInputChange('notifications', 'submissions', e.target.checked)}
                          />
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Achievement Notifications</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={formData.notifications.achievements}
                            onChange={(e) => handleInputChange('notifications', 'achievements', e.target.checked)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Palette className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Preferences</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Theme</span>
                        </label>
                        <select
                          className="select select-bordered"
                          value={formData.preferences.theme}
                          onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Default Language</span>
                        </label>
                        <select
                          className="select select-bordered"
                          value={formData.preferences.language}
                          onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                        >
                          <option value="javascript">JavaScript</option>
                          <option value="python">Python</option>
                          <option value="java">Java</option>
                          <option value="cpp">C++</option>
                          <option value="typescript">TypeScript</option>
                          <option value="go">Go</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Auto-save code</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={formData.preferences.autoSave}
                            onChange={(e) => handleInputChange('preferences', 'autoSave', e.target.checked)}
                          />
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Show hints by default</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={formData.preferences.showHints}
                            onChange={(e) => handleInputChange('preferences', 'showHints', e.target.checked)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Coding Settings */}
                {activeTab === 'coding' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Code className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Coding Settings</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Editor Font Size: {formData.preferences.fontSize}px</span>
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="24"
                          value={formData.preferences.fontSize}
                          className="range range-primary"
                          onChange={(e) => handleInputChange('preferences', 'fontSize', parseInt(e.target.value))}
                        />
                        <div className="w-full flex justify-between text-xs px-2">
                          <span>10px</span>
                          <span>24px</span>
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Editor Theme</span>
                        </label>
                        <select className="select select-bordered">
                          <option value="vs-dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="hc-black">High Contrast</option>
                        </select>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Tab Size</span>
                        </label>
                        <select className="select select-bordered">
                          <option value="2">2 spaces</option>
                          <option value="4">4 spaces</option>
                          <option value="8">8 spaces</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end mt-8 pt-6 border-t border-base-300">
                  <button onClick={handleSave} className="btn btn-primary gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;