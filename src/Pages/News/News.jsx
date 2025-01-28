import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code,
  Users,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Share2,
  ExternalLink,
} from 'lucide-react';

const News = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const API_KEY = 'f37970e85a6747adb801eaf008108a57'; // Replace with your News API key

  const tabs = [
    { id: 'news', label: 'Learn', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'earn', label: 'Earn', icon: TrendingUp },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web', label: 'Web Dev' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'blockchain', label: 'Blockchain' },
  ];

  useEffect(() => {
    fetchPosts();
  }, [page, activeTab]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=technology&language=en&pageSize=10&page=${page}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      if (data.articles) {
        setPosts((prev) => (page === 1 ? data.articles : [...prev, ...data.articles]));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation Tabs */}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-gray-800 hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-gray-900 rounded-xl hover:bg-gray-800/80 transition-colors duration-200"
            >
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <img
                    src={post.urlToImage || '/api/placeholder/32/32'}
                    alt={post.author || 'Author'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium flex items-center">
                      {post.author || 'Unknown Author'}
                      <span className="mx-2 text-gray-600">·</span>
                      <span className="text-orange-500">{post.source.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="cursor-pointer">
                  <h2 className="text-xl font-semibold mb-2 text-gray-100">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {post.description}
                  </p>
                </div>

                {/* Engagement */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-gray-800 space-y-4 md:space-y-0">
                  {/* Left Section: Engagement Buttons */}
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                      <ThumbsUp className="w-5 h-5 mr-2" />
                      <span className="text-sm hidden md:inline">Like</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm hidden md:inline">Comment</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-orange-500 transition-colors">
                      <Bookmark className="w-5 h-5 mr-2" />
                      <span className="text-sm hidden md:inline">Bookmark</span>
                    </button>
                  </div>

                  {/* Right Section: Share and Read More */}
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-orange-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      <span className="text-sm mr-2">Read More</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
          >
            Load More
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
