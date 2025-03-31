"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart2,
  FolderIcon,
  Layout,
  ChevronRight,
  ChevronLeft,
  Zap,
  Atom
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only show expanded state after component mounts to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Always use the collapsed state for SSR
  const sidebarWidth = isMounted && isExpanded ? 'w-56' : 'w-12';
  
  return (
    <div className={`fixed left-0 top-0 h-screen ${sidebarWidth} bg-[#0F0F12] border-r border-[#222222]/20 flex flex-col z-40 transition-all duration-300 ease-in-out`}>
      {/* Only show toggle button after client-side hydration */}
      {isMounted && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute ${isExpanded ? 'right-3 top-3' : 'right-[-10px] top-3'} h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md z-10 hover:scale-105 transition-all`}
          aria-label="Toggle sidebar"
        >
          {isExpanded ? 
            <ChevronLeft className="h-3 w-3 text-black" /> : 
            <ChevronRight className="h-3 w-3 text-black" />
          }
        </button>
      )}

      {/* Logo section */}
      <div className="mt-4 flex justify-center">
        <div className="h-8 w-8 bg-yellow-400 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex flex-col items-center space-y-5 mt-8">
        {/* Nav Item: Circle */}
        <NavItem 
          href="/dashboard/circle"
          icon={<Atom className="h-4 w-4" />}
          label="Circle"
          isActive={pathname === '/dashboard/circle'}
          isExpanded={isMounted && isExpanded}
        />
        
        {/* Nav Item: Atoms */}
        <NavItem 
          href="/dashboard/atoms"
          icon={<Atom className="h-4 w-4" />}
          label="Atoms"
          isActive={pathname === '/dashboard/atoms'}
          isExpanded={isMounted && isExpanded}
        />
        
        {/* Nav Item: Explore (active) */}
        <NavItem 
          href="/dashboard"
          icon={<BarChart2 className="h-4 w-4" />}
          label="Explore"
          isActive={pathname === '/dashboard'}
          isExpanded={isMounted && isExpanded}
        />
        
        {/* Nav Item: Projects */}
        <NavItem 
          href="/dashboard/projects"
          icon={<FolderIcon className="h-4 w-4" />}
          label="Projects"
          isActive={pathname === '/dashboard/projects'}
          isExpanded={isMounted && isExpanded}
        />
        
        {/* Nav Item: Dashboard */}
        <NavItem 
          href="/dashboard/personal"
          icon={<Zap className="h-4 w-4" />}
          label="Dashboard"
          isActive={pathname === '/dashboard/personal'}
          isExpanded={isMounted && isExpanded}
        />
      </div>
      
      {/* User avatar */}
      <div className="mt-auto mb-4 flex justify-center">
        <div className="h-7 w-7 bg-[#111111] rounded-full flex items-center justify-center border border-[#333333]/40">
          <span className="text-white font-medium text-xs">N</span>
        </div>
      </div>
    </div>
  );
} 

// NavItem component for consistent rendering
function NavItem({
  href,
  icon,
  label,
  isActive,
  isExpanded
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isExpanded: boolean;
}) {
  return (
    <Link 
      href={href} 
      className="w-full relative flex items-center justify-center group"
    >
      {/* Yellow indicator bar for active items */}
      {isActive && (
        <div className="absolute left-0 w-0.5 h-5 bg-yellow-400"></div>
      )}
      
      <div className={`${
        isActive 
          ? 'text-white' 
          : 'text-gray-400 hover:text-gray-200'
        } h-8 w-8 rounded flex items-center justify-center transition-all`}
      >
        {icon}
      </div>
      
      {isExpanded && (
        <div className={`ml-2 mr-1 ${isActive ? 'text-white' : 'text-gray-400'} text-xs font-medium`}>
          {label}
        </div>
      )}
    </Link>
  );
} 