import { Link } from "react-router-dom";
import {
  Code,
  Trophy,
  Users,
  BookOpen,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Github,
  Play,
  Brain,
  Rocket,
  Shield,
  Clock,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Multi-Language Support",
      description:
        "Code in JavaScript, Python, Java, C++, TypeScript, and Go with real-time syntax highlighting.",
    },
    {
      icon: <Brain className="w-8 h-8 text-secondary" />,
      title: "AI-Powered Assistant",
      description:
        "Get intelligent hints, code reviews, and explanations from our Gemini AI tutor.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-accent" />,
      title: "Progress Tracking",
      description:
        "Track your solved problems, submission history, and coding progress over time.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-info" />,
      title: "Curated Problem Sets",
      description:
        "Organize problems into custom playlists for structured learning paths.",
    },
    {
      icon: <Zap className="w-8 h-8 text-warning" />,
      title: "Real-time Execution",
      description:
        "Test your code instantly with our Judge0-powered execution engine.",
    },
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: "Secure & Fast",
      description:
        "Enterprise-grade security with lightning-fast code execution and testing.",
    },
  ];

  const stats = [
    { number: "500+", label: "Coding Problems" },
    { number: "10K+", label: "Solutions Submitted" },
    { number: "6", label: "Programming Languages" },
    { number: "24/7", label: "AI Assistant Available" },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Software Engineer at Google",
      content:
        "The AI assistant helped me understand complex algorithms better than any other platform.",
      avatar: "AC",
    },
    {
      name: "Sarah Johnson",
      role: "CS Student at MIT",
      content:
        "Perfect for interview prep. The problem organization and tracking features are amazing.",
      avatar: "SJ",
    },
    {
      name: "Mike Rodriguez",
      role: "Full Stack Developer",
      content:
        "Multi-language support and real-time execution make this my go-to practice platform.",
      avatar: "MR",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center max-w-6xl">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Master{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Coding
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-base-content/80 max-w-3xl mx-auto">
              Practice data structures and algorithms with our AI-powered
              platform. Get personalized hints, instant feedback, and track your
              progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                <Rocket className="w-5 h-5" />
                Start Coding Now
              </Link>
              <button className="btn btn-outline btn-lg gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-primary">Excel</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Our platform combines the best of modern technology with proven
              learning methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="card-body">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Editor Preview */}
      <section className="py-20 bg-gradient-to-br from-base-200 to-base-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="text-secondary">Code Editor</span>
            </h2>
            <p className="text-xl text-base-content/70">
              Monaco Editor with syntax highlighting, auto-completion, and
              multi-language support
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="mockup-code bg-base-100 shadow-2xl">
              <pre data-prefix="1">
                <code>
                  <span className="text-primary">function</span>{" "}
                  <span className="text-secondary">twoSum</span>(nums, target){" "}
                  {"{"}
                </code>
              </pre>
              <pre data-prefix="2">
                <code> const map = new Map();</code>
              </pre>
              <pre data-prefix="3">
                <code> </code>
              </pre>
              <pre data-prefix="4">
                <code> for (let i = 0; i &lt; nums.length; i++) {"{"}</code>
              </pre>
              <pre data-prefix="5">
                <code> const complement = target - nums[i];</code>
              </pre>
              <pre data-prefix="6">
                <code> </code>
              </pre>
              <pre data-prefix="7">
                <code> if (map.has(complement)) {"{"}</code>
              </pre>
              <pre data-prefix="8">
                <code> return [map.get(complement), i];</code>
              </pre>
              <pre data-prefix="9">
                <code> {"}"}</code>
              </pre>
              <pre data-prefix="10">
                <code> </code>
              </pre>
              <pre data-prefix="11">
                <code> map.set(nums[i], i);</code>
              </pre>
              <pre data-prefix="12">
                <code> {"}"}</code>
              </pre>
              <pre data-prefix="13">
                <code>{"}"}</code>
              </pre>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <div className="badge badge-primary badge-lg">JavaScript</div>
              <div className="badge badge-secondary badge-lg">Python</div>
              <div className="badge badge-accent badge-lg">Java</div>
              <div className="badge badge-info badge-lg">C++</div>
              <div className="badge badge-warning badge-lg">TypeScript</div>
              <div className="badge badge-success badge-lg">Go</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-accent">Developers</span>
            </h2>
            <p className="text-xl text-base-content/70">
              See what our community has to say about their learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-warning text-warning"
                      />
                    ))}
                  </div>
                  <p className="text-base-content/80 mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-10">
                        <span className="text-xs">{testimonial.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-base-content/60">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-content mb-6">
            Ready to Level Up Your Coding Skills?
          </h2>
          <p className="text-xl text-primary-content/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already improving their
            problem-solving skills with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-accent btn-lg gap-2">
              <Target className="w-5 h-5" />
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">LeetLab</span>
          </div>
          <p className="text-base-content/70">
            Empowering developers to master data structures and algorithms with
            AI assistance.
          </p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a className="btn btn-ghost btn-circle">
              <Github className="w-5 h-5" />
            </a>
            <a className="btn btn-ghost btn-circle">
              <Users className="w-5 h-5" />
            </a>
            <a className="btn btn-ghost btn-circle">
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm text-base-content/60">
            © 2024 LeetLab. All rights reserved. Built with ❤️ for developers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
