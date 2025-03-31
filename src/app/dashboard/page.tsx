"use client";

import React from "react";
import { BookOpen, Download, Plus, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Card component for the ideas
const IdeaCard = ({ 
  category, 
  title, 
  description, 
  votes, 
  tags, 
  author 
}: { 
  category: string; 
  title: string; 
  description: string; 
  votes?: number; 
  tags: string[];
  author: { initial: string; name: string };
}) => {
  return (
    <div className="mb-8">
      <div className="bg-[#111111] rounded-lg overflow-hidden border border-[#222]">
        <div className="h-1 w-full bg-yellow-400"></div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-medium text-gray-400">{category}</span>
            {votes !== undefined && (
              <div className="flex items-center space-x-2">
                <ThumbsUp size={14} className="text-white" />
                <span className="text-sm font-bold">{votes}</span>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-3 py-1 rounded-full bg-black/60 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center mt-4">
            <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs font-medium text-white mr-3">
              {author.initial}
            </div>
            <span className="text-sm text-gray-400">{author.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Main content */}
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
              className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-medium flex items-center justify-center"
            >
              <span className="mr-2">Random Ideas</span>
            </Link>
            <Link 
              href="/dashboard/manager" 
              className="px-6 py-3 rounded-lg bg-transparent hover:bg-[#222] text-white font-medium flex items-center justify-center"
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
              <h2 className="text-xl font-bold text-white">Random Ideas</h2>
              <p className="text-gray-400 text-sm">Explore and vote on innovative concepts</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 rounded-lg border border-gray-700 text-white flex items-center hover:bg-[#222]">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <button className="px-4 py-2 rounded-lg bg-yellow-400 text-black flex items-center font-medium">
                <Plus size={16} className="mr-2" />
                Add New
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid of ideas */}
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <IdeaCard 
            category="Technology" 
            title="Neural interface for thought-to-text" 
            description="A wearable device that translates thoughts directly into text for instant communication."
            votes={42}
            tags={["AI", "Wearables", "Innovation"]}
            author={{initial: "E", name: "Erica K."}}
          />
          
          <IdeaCard 
            category="Collaboration" 
            title="Holographic meeting spaces" 
            description="Create 3D holographic environments for remote team collaboration with spatial audio."
            votes={56}
            tags={["AR/VR", "Remote Work", "Prototyping"]}
            author={{initial: "M", name: "Marcus J."}}
          />
          
          <IdeaCard 
            category="Materials" 
            title="Smart fabric with adaptive temperature" 
            description="Clothing fabric that adapts to environmental conditions and body temperature."
            votes={19}
            tags={["Wearables", "IoT", "Sustainability"]}
            author={{initial: "E", name: "Erica K."}}
          />
          
          <IdeaCard 
            category="Software" 
            title="AI-powered content summarizer" 
            description="Tool that reduces long-form content into key points while preserving context and nuance."
            votes={56}
            tags={["AI", "Productivity", "NLP"]}
            author={{initial: "M", name: "Marcus J."}}
          />
        </div>
      </div>
    </div>
  );
} 