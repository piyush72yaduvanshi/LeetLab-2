import React, { useEffect, useState } from "react";
import { useProblemStore } from "../store/useProblemStore";
import ProblemsTable from "../components/ProblemTable";
import { 
  Loader, 
  Search, 
  Filter, 
  Code, 
  Trophy, 
  Target,
  TrendingUp,
  BookOpen,
  Zap
} from "lucide-react";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-base-100 to-base-200">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium text-base-content/70">Loading problems...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      icon: <Code className="w-6 h-6" />, 
      label: "Total Problems", 
      value: problems.length,
      color: "text-primary"
    },
    { 
      icon: <Target className="w-6 h-6" />, 
      label: "Easy", 
      value: problems.filter(p => p.difficulty === 'EASY').length,
      color: "text-success"
    },
    { 
      icon: <TrendingUp className="w-6 h-6" />, 
      label: "Medium", 
      value: problems.filter(p => p.difficulty === 'MEDIUM').length,
      color: "text-warning"
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      label: "Hard", 
      value: problems.filter(p => p.difficulty === 'HARD').length,
      color: "text-error"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
            <h1 className="relative text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Problem Arena
              </span>
            </h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
            Master data structures and algorithms with our curated collection of coding challenges. 
            Practice, learn, and excel in your programming journey.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body p-4 text-center">
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-base-content/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search problems by title..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <Filter className="w-5 h-5 text-base-content/60" />
                <select
                  className="select select-bordered"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="ALL">All Difficulties</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        {problems.length > 0 ? (
          <ProblemsTable 
            problems={problems}
            searchTerm={searchTerm}
            selectedDifficulty={selectedDifficulty}
          />
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-base-content/30" />
              <h3 className="text-2xl font-bold mb-2">No Problems Found</h3>
              <p className="text-base-content/60 mb-6">
                It looks like there are no problems available at the moment.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => getAllProblems()} 
                  className="btn btn-primary gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Refresh Problems
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
