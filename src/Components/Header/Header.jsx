import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Users, Code, TrendingUp } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  
  const tabs = [
    { id: 'home', label: 'Home', icon: BookOpen, path: '/' },
    { id: 'news', label: 'News', icon: TrendingUp, path: '/news' },
    { id: 'community', label: 'Community', icon: Users, path: '/community' },
    { id: 'code', label: 'Code', icon: Code, path: '/code' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-black to-gray-800 text-white border-b border-orange-700 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Left Section: Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Webreich Logo" className="h-10 w-10 " />
            {/* <span className="text-2xl font-bold tracking-wide">Webreich</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {tabs.map(({ id, label, icon: Icon, path }) => (
              <Link
                key={id}
                to={path}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-orange-700 text-white'
                    : 'text-orange-200 hover:text-white hover:bg-orange-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-orange-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col px-4 pt-4 pb-6 space-y-3">
              {tabs.map(({ id, label, icon: Icon, path }) => (
                <Link
                  key={id}
                  to={path}
                  onClick={() => {
                    setActiveTab(id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-orange-700 text-white'
                      : 'text-orange-200 hover:text-white hover:bg-orange-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
