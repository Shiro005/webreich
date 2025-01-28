import { useState } from 'react';
import { Globe, BookOpen, Users, Code, TrendingUp, Award, MessageCircle, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentTab, setCurrentTab] = useState('trending');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section - More subtle and professional */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2 text-orange-500">
                <Globe className="h-6 w-6" />
                <span className="text-sm font-semibold">India's Tech Learning Community</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Transform Your Tech Journey with
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> WebReich</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Code with cutting edge technologies, build real-world projects, and connect with a vibrant tech community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link to="/code">
                <button className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition duration-200 shadow-lg">
                  Start Learning
                </button>
              </Link>
              <Link to="https://chat.whatsapp.com/DBnzgt5qZuNAGiopVs8jb3">
                <button className="border border-orange-500 text-orange-500 px-6 py-2.5 rounded-lg hover:bg-orange-500/10 transition duration-200">
                  Join Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Content Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex overflow-x-auto space-x-8 pb-4 mb-8">
          {['trending', 'news', 'community', 'courses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`whitespace-nowrap text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${currentTab === tab
                ? 'bg-orange-500 text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800 transition duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Advanced React Patterns</h3>
                    <p className="text-sm text-slate-400">Frontend Development</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Learn advanced React patterns and best practices from industry experts.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  <Users className="h-4 w-4 inline mr-1" />
                  2.4k learners
                </span>
                <span className="text-orange-500 hover:text-orange-400 cursor-pointer">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose WebReich */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why Choose WebReich</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join thousands of learners benefiting from our AI-powered platform and vibrant community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Database className="h-6 w-6" />,
              title: "Trending Tech Learning",
              description: "Personalized learning paths adapted to your goals and skill level"
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Active Community",
              description: "Connect with mentors and peers in India's largest tech community"
            },
            {
              icon: <Code className="h-6 w-6" />,
              title: "Practical Projects",
              description: "Build real-world projects with guidance from industry experts"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "400+", label: "Active Learners" },
              { number: "10+", label: "Expert Mentors" },
              { number: "100+", label: "Learning Paths" },
              { number: "40+", label: "Live Projects" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Join WebReich today and become part of India's most innovative tech learning community.
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-medium hover:bg-orange-50 transition duration-200">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
