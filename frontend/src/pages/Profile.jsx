import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  User, 
  Shield, 
  Image, 
  Calendar,
  Trophy,
  Target,
  Activity,
  Edit3,
  Settings,
  Award,
  Code,
  Clock,
  TrendingUp
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";

const Profile = () => {
  const { authUser } = useAuthStore();
  const { solvedProblems, getSolvedProblemByUser } = useProblemStore();
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    getSolvedProblemByUser();
    getAllSubmissions();
  }, [getSolvedProblemByUser, getAllSubmissions]);

  const stats = {
    totalSolved: solvedProblems?.length || 0,
    totalSubmissions: submissions?.length || 0,
    acceptanceRate: submissions?.length > 0 
      ? Math.round((submissions.filter(s => s.status === 'Accepted').length / submissions.length) * 100)
      : 0,
    easyCount: solvedProblems?.filter(p => p.difficulty === 'EASY').length || 0,
    mediumCount: solvedProblems?.filter(p => p.difficulty === 'MEDIUM').length || 0,
    hardCount: solvedProblems?.filter(p => p.difficulty === 'HARD').length || 0,
  };

  const memberSince = new Date(authUser?.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "submissions", label: "Submissions", icon: Code },
    { id: "solved", label: "Solved Problems", icon: Trophy },
    { id: "playlists", label: "Playlists", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="btn btn-ghost btn-circle">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="text-base-content/60">Manage your account and track your progress</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-8">
              <div className="card-body text-center">
                {/* Avatar */}
                <div className="avatar mb-4">
                  <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img 
                      src={authUser?.image || "https://avatar.iran.liara.run/public/boy"} 
                      alt={authUser?.name}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold mb-2">{authUser?.name}</h2>
                <div className={`badge ${authUser?.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'} mb-4`}>
                  {authUser?.role}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="stat bg-base-200 rounded-lg p-3">
                    <div className="stat-value text-lg text-primary">{stats.totalSolved}</div>
                    <div className="stat-title text-xs">Solved</div>
                  </div>
                  <div className="stat bg-base-200 rounded-lg p-3">
                    <div className="stat-value text-lg text-secondary">{stats.acceptanceRate}%</div>
                    <div className="stat-title text-xs">Accuracy</div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {memberSince}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="btn btn-primary btn-sm w-full gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="btn btn-outline btn-sm w-full gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Total Solved</p>
                      <p className="text-2xl font-bold">{stats.totalSolved}</p>
                    </div>
                    <Trophy className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-success to-success-focus text-success-content shadow-lg">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Easy</p>
                      <p className="text-2xl font-bold">{stats.easyCount}</p>
                    </div>
                    <Target className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-warning to-warning-focus text-warning-content shadow-lg">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Medium</p>
                      <p className="text-2xl font-bold">{stats.mediumCount}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-error to-error-focus text-error-content shadow-lg">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Hard</p>
                      <p className="text-2xl font-bold">{stats.hardCount}</p>
                    </div>
                    <Activity className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-0">
                {/* Tab Headers */}
                <div className="tabs tabs-bordered px-6 pt-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        className={`tab gap-2 ${activeTab === tab.id ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Personal Information
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                              <Mail className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">Email</p>
                                <p className="text-sm text-base-content/60">{authUser?.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                              <Shield className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">Role</p>
                                <p className="text-sm text-base-content/60">{authUser?.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                              <Image className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">Profile Image</p>
                                <p className="text-sm text-base-content/60">
                                  {authUser?.image ? "Uploaded" : "Not set"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Achievements
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Problem Solver</p>
                                <p className="text-sm text-base-content/60">
                                  Solved {stats.totalSolved} problems
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                                <Target className="w-5 h-5 text-success" />
                              </div>
                              <div>
                                <p className="font-medium">Accuracy Master</p>
                                <p className="text-sm text-base-content/60">
                                  {stats.acceptanceRate}% acceptance rate
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "submissions" && <ProfileSubmission />}
                  {activeTab === "solved" && <ProblemSolvedByUser />}
                  {activeTab === "playlists" && <PlaylistProfile />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;