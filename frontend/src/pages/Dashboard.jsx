import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  Code,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity,
  Flame,
  Award,
  BookOpen,
  Zap,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";
import { useSubmissionStore } from "../store/useSubmissionStore";

const Dashboard = () => {
  const { authUser } = useAuthStore();
  const { problems, getAllProblems, getSolvedProblemByUser, solvedProblems } =
    useProblemStore();
  const { getAllSubmissions, submissions } = useSubmissionStore();

  const [stats, setStats] = useState({
    totalSolved: 0,
    totalProblems: 0,
    easyCount: 0,
    mediumCount: 0,
    hardCount: 0,
    recentSubmissions: 0,
    streak: 0,
    accuracy: 0,
  });

  useEffect(() => {
    getAllProblems();
    getSolvedProblemByUser();
    getAllSubmissions();
  }, [getAllProblems, getSolvedProblemByUser, getAllSubmissions]);

  useEffect(() => {
    if (problems && solvedProblems && submissions) {
      const totalSolved = solvedProblems.length;
      const totalProblems = problems.length;

      // Count by difficulty
      const easyCount = solvedProblems.filter(
        (p) => p.difficulty === "EASY"
      ).length;
      const mediumCount = solvedProblems.filter(
        (p) => p.difficulty === "MEDIUM"
      ).length;
      const hardCount = solvedProblems.filter(
        (p) => p.difficulty === "HARD"
      ).length;

      // Recent submissions (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const recentSubmissions = submissions.filter(
        (s) => new Date(s.createdAt) > weekAgo
      ).length;

      // Calculate accuracy
      const acceptedSubmissions = submissions.filter(
        (s) => s.status === "Accepted"
      ).length;
      const accuracy =
        submissions.length > 0
          ? Math.round((acceptedSubmissions / submissions.length) * 100)
          : 0;

      setStats({
        totalSolved,
        totalProblems,
        easyCount,
        mediumCount,
        hardCount,
        recentSubmissions,
        streak: 5, // This would need proper calculation based on consecutive days
        accuracy,
      });
    }
  }, [problems, solvedProblems, submissions]);

  const progressPercentage =
    stats.totalProblems > 0
      ? (stats.totalSolved / stats.totalProblems) * 100
      : 0;

  const recentActivity = submissions.slice(0, 5).map((submission) => ({
    id: submission.id,
    problemTitle: `Problem ${submission.problemId.slice(0, 8)}...`,
    status: submission.status,
    language: submission.language,
    time: new Date(submission.createdAt).toLocaleDateString(),
  }));

  const difficultyData = [
    {
      name: "Easy",
      solved: stats.easyCount,
      total: problems.filter((p) => p.difficulty === "EASY").length,
      color: "success",
    },
    {
      name: "Medium",
      solved: stats.mediumCount,
      total: problems.filter((p) => p.difficulty === "MEDIUM").length,
      color: "warning",
    },
    {
      name: "Hard",
      solved: stats.hardCount,
      total: problems.filter((p) => p.difficulty === "HARD").length,
      color: "error",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back,{" "}
            <span className="text-primary">
              {authUser?.name || "Developer"}
            </span>
            ! 👋
          </h1>
          <p className="text-base-content/70 text-lg">
            Ready to solve some problems today? Let's keep that streak going!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{stats.totalSolved}</h3>
                  <p className="opacity-90">Problems Solved</p>
                </div>
                <Trophy className="w-8 h-8 opacity-80" />
              </div>
              <div className="mt-2">
                <div className="text-sm opacity-75">
                  {stats.totalProblems - stats.totalSolved} remaining
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-secondary-focus text-secondary-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{stats.accuracy}%</h3>
                  <p className="opacity-90">Accuracy Rate</p>
                </div>
                <Target className="w-8 h-8 opacity-80" />
              </div>
              <div className="mt-2">
                <div className="text-sm opacity-75">
                  {submissions.filter((s) => s.status === "Accepted").length}{" "}
                  accepted
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent to-accent-focus text-accent-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{stats.streak}</h3>
                  <p className="opacity-90">Day Streak</p>
                </div>
                <Flame className="w-8 h-8 opacity-80" />
              </div>
              <div className="mt-2">
                <div className="text-sm opacity-75">Keep it up! 🔥</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-info to-info-focus text-info-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {stats.recentSubmissions}
                  </h3>
                  <p className="opacity-90">This Week</p>
                </div>
                <Activity className="w-8 h-8 opacity-80" />
              </div>
              <div className="mt-2">
                <div className="text-sm opacity-75">Submissions made</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title text-2xl">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    Overall Progress
                  </h2>
                  <div className="text-sm text-base-content/60">
                    {Math.round(progressPercentage)}% Complete
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Problems Solved</span>
                    <span>
                      {stats.totalSolved} / {stats.totalProblems}
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary w-full h-3"
                    value={stats.totalSolved}
                    max={stats.totalProblems}
                  ></progress>
                </div>

                {/* Difficulty Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  {difficultyData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold text-${item.color}`}>
                        {item.solved}
                      </div>
                      <div className="text-sm text-base-content/60 mb-2">
                        {item.name}
                      </div>
                      <progress
                        className={`progress progress-${item.color} w-full h-2`}
                        value={item.solved}
                        max={item.total}
                      ></progress>
                      <div className="text-xs text-base-content/50 mt-1">
                        {item.solved} / {item.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                  Recent Activity
                </h2>

                <div className="space-y-3">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {activity.status === "Accepted" ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-error" />
                          )}
                          <div>
                            <div className="font-medium">
                              {activity.problemTitle}
                            </div>
                            <div className="text-sm text-base-content/60">
                              {activity.language} • {activity.time}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`badge ${
                            activity.status === "Accepted"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {activity.status}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-base-content/60">
                      <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No recent submissions</p>
                      <p className="text-sm">
                        Start solving problems to see your activity here!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <Zap className="w-5 h-5 text-warning" />
                  Quick Actions
                </h2>

                <div className="space-y-3">
                  <Link to="/problems" className="btn btn-primary w-full gap-2">
                    <Code className="w-4 h-4" />
                    Browse Problems
                  </Link>
                  <Link to="/profile" className="btn btn-outline w-full gap-2">
                    <Trophy className="w-4 h-4" />
                    View Profile
                  </Link>
                  <Link
                    to="/playlists"
                    className="btn btn-outline w-full gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    My Playlists
                  </Link>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="card bg-gradient-to-br from-success to-success-focus text-success-content shadow-xl">
              <div className="card-body text-center">
                <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <h3 className="text-lg font-bold mb-2">Problem Solver</h3>
                <p className="text-sm opacity-90 mb-4">
                  You've solved {stats.totalSolved} problems! Keep up the great
                  work.
                </p>
                <div className="text-xs opacity-75">
                  Next milestone: {Math.ceil(stats.totalSolved / 10) * 10}{" "}
                  problems
                </div>
              </div>
            </div>

            {/* Study Tip */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-lg mb-3">💡 Daily Tip</h2>
                <p className="text-sm text-base-content/70">
                  Try to solve at least one problem daily to maintain your
                  streak. Focus on understanding the algorithm rather than just
                  getting the right answer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
