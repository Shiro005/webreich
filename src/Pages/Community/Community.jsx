import React, { useState, useEffect } from 'react';
import { FiGithub, FiTarget } from 'react-icons/fi';
import { FaReddit, FaDiscord } from 'react-icons/fa';

function Community() {
  const [communities, setCommunities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  useEffect(() => {
    fetch('/communities.json')
      .then(res => res.json())
      .then(data => {
        setCommunities(data);
        setLoading(false);
      });
  }, []);

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <FiGithub className="w-6 h-6" />;
      case 'reddit':
        return <FaReddit className="w-6 h-6" />;
      case 'discord':
        return <FaDiscord className="w-6 h-6" />;
      default:
        return <FiTarget className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const filteredPlatforms = selectedPlatform === 'all' 
    ? communities.platforms 
    : communities.platforms.filter(p => p.name.toLowerCase() === selectedPlatform);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 mb-4">
            Developer Communities
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thriving developer communities to learn, share, and grow together
          </p>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all
              ${selectedPlatform === 'all' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            All Platforms
          </button>
          {communities.platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => setSelectedPlatform(platform.name.toLowerCase())}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                ${selectedPlatform === platform.name.toLowerCase()
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {getIcon(platform.name)}
              {platform.name}
            </button>
          ))}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlatforms.map((platform) => (
            <div key={platform.name} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gray-800 rounded-lg">
                  {getIcon(platform.name)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-orange-500">{platform.name}</h2>
                  <p className="text-sm text-gray-400">{platform.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {platform.communities.map((community, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all border border-gray-700 hover:border-orange-500/50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg">{community.name}</h3>
                      <span className="text-sm text-orange-500 font-medium">
                        {community.members}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{community.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-400">{community.activity}</span>
                      </div>
                      <a
                        href={community.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors inline-flex items-center gap-2"
                      >
                        Join Community
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;