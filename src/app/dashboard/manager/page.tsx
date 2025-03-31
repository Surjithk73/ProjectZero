"use client";

import React from "react";
import { BookOpen, Plus, FolderOpen } from "lucide-react";
import Link from "next/link";

const IdeaManagerCard = ({ 
  title, 
  status,
  date,
  progress
}: { 
  title: string; 
  status: "In progress" | "Completed" | "Draft"; 
  date: string;
  progress: number;
}) => {
  const statusColors = {
    "In progress": "bg-blue-400/20 text-blue-400",
    "Completed": "bg-green-400/20 text-green-400",
    "Draft": "bg-yellow-400/20 text-yellow-400"
  };
  
  return (
    <div className="bg-[#111111] rounded-lg overflow-hidden border border-[#222] p-5">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">Last edited: {date}</p>
      
      <div className="w-full bg-[#222] rounded-full h-2 mb-1">
        <div 
          className="bg-yellow-400 h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      
      <div className="flex justify-between mt-5">
        <button className="text-gray-400 hover:text-white text-sm">View Details</button>
        <button className="text-yellow-400 hover:text-yellow-500 text-sm">Edit</button>
      </div>
    </div>
  );
};

export default function IdeaManager() {
  return (
    <div className="pl-16 lg:pl-72">
      {/* Header section */}
      <div className="p-8 pb-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center">
            <BookOpen className="text-yellow-900 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">IdeaSpace Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage your creative ideas and innovation projects</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-transparent hover:bg-[#222] text-white font-medium flex items-center justify-center"
          >
            <span className="mr-2">Random Ideas</span>
          </Link>
          <Link
            href="/dashboard/manager"
            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-medium flex items-center justify-center"
          >
            <span className="mr-2">Idea Manager</span>
          </Link>
          <Link
            href="/dashboard/analysis"
            className="px-6 py-3 rounded-lg bg-transparent hover:bg-[#222] text-white font-medium flex items-center justify-center"
          >
            <span className="mr-2">Product Analysis</span>
          </Link>
        </div>
        
        {/* Section header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Idea Manager</h2>
            <p className="text-gray-400 text-sm">Track and manage your idea development process</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 rounded-lg border border-gray-700 text-white flex items-center hover:bg-[#222]">
              <FolderOpen size={16} className="mr-2" />
              View All
            </button>
            <button className="px-4 py-2 rounded-lg bg-yellow-400 text-black flex items-center font-medium">
              <Plus size={16} className="mr-2" />
              New Idea
            </button>
          </div>
        </div>
      </div>
      
      {/* Grid of managed ideas */}
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        <IdeaManagerCard 
          title="AI-Powered Fitness App"
          status="In progress"
          date="Today, 2:30 PM"
          progress={75}
        />
        
        <IdeaManagerCard 
          title="Smart Home Network Hub"
          status="Completed"
          date="May 12, 2023"
          progress={100}
        />
        
        <IdeaManagerCard 
          title="AR Shopping Experience"
          status="Draft"
          date="Yesterday, 9:15 AM"
          progress={30}
        />
        
        <IdeaManagerCard 
          title="Sustainable Transport Network"
          status="In progress"
          date="May 23, 2023"
          progress={50}
        />
        
        <IdeaManagerCard 
          title="Personalized Education Platform"
          status="Draft"
          date="April 30, 2023"
          progress={15}
        />
        
        <IdeaManagerCard 
          title="Blockchain Medical Records"
          status="Completed"
          date="May 10, 2023"
          progress={100}
        />
      </div>
    </div>
  );
} 