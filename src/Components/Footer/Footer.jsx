import React, { useState } from 'react';
import { Menu, X, Globe, Code, Users, Home, ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-14 w-14 bg-transparent flex items-center justify-center">
               <img src="/logo.png" alt="" />
              </div>
            </div>
            <p className="text-gray-400">
              Empowering businesses with innovative web solutions and cutting-edge technology.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Cloud Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">API Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">GitHub</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Webreich. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
