"use client";

import React from 'react';
import { BellIcon, SearchIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-12 right-0 h-14 px-4 flex items-center justify-between bg-[#0A0A0A] border-b border-[#222222]/20 z-30">
      {/* Logo and brand */}
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-7 h-7 bg-yellow-400 rounded-md flex items-center justify-center mr-2">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <span className="text-base font-medium text-yellow-400">Ideaflow</span>
        </Link>
      </div>
      
      {/* Search bar */}
      <div className="flex-1 max-w-2xl mx-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-3.5 w-3.5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-8 bg-[#111111] border-0 rounded px-8 py-1 text-sm text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
      
      {/* User section */}
      <div className="flex items-center space-x-4">
        {/* Notification bell */}
        <div className="relative">
          <button 
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-300"
            aria-label="Notifications"
          >
            <BellIcon className="w-4 h-4" />
          </button>
          <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black text-[8px] font-medium">2</span>
          </div>
        </div>
        
        {/* User avatar */}
        <div className="relative">
          <Avatar className="h-7 w-7 border border-[#333333]/40">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header; 