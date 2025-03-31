"use client";

import React from "react";
import { MicIcon, TypeIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalysisPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-primary/30 shadow-lg overflow-hidden transition-all duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-primary/20"></div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-black/40 rounded-full flex items-center justify-center border border-primary/20">
                <MicIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Voice Mode</h3>
                <p className="text-xs text-white/60">Express your idea verbally</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-white/70 mb-4">
                Speak your idea naturally. Our AI will convert your speech to text and analyze it in detail.
              </p>
              <Button 
                className="w-full bg-black/40 hover:bg-black/60 border border-primary/20 hover:border-primary/40 text-white hover:text-primary transition-all"
              >
                Start Recording
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-primary/30 shadow-lg overflow-hidden transition-all duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-primary/20"></div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-black/40 rounded-full flex items-center justify-center border border-primary/20">
                <TypeIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Text Mode</h3>
                <p className="text-xs text-white/60">Type your idea in detail</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-white/70 mb-4">
                Write a detailed description of your idea. Perfect for well-formulated concepts.
              </p>
              <Button 
                className="w-full bg-black/40 hover:bg-black/60 border border-primary/20 hover:border-primary/40 text-white hover:text-primary transition-all"
              >
                Start Typing
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-primary/30 shadow-lg overflow-hidden transition-all duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-primary/20"></div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-black/40 rounded-full flex items-center justify-center border border-primary/20">
                <PlusIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import Idea</h3>
                <p className="text-xs text-white/60">Upload a document</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-white/70 mb-4">
                Upload a document containing your idea. Supported formats: PDF, DOCX, TXT.
              </p>
              <Button 
                className="w-full bg-black/40 hover:bg-black/60 border border-primary/20 hover:border-primary/40 text-white hover:text-primary transition-all"
              >
                Upload File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/5">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
          Recently Analyzed Ideas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="p-4 rounded-lg bg-black/20 border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
            >
              <h4 className="font-medium">AI-Powered Fitness Coach</h4>
              <p className="text-xs text-white/60 mt-1">Analyzed 2 days ago</p>
              <div className="mt-3 flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                <span className="text-xs text-white/70">87% Viability Score</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 