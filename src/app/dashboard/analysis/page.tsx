"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Keyboard, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AIVoiceInput } from "@/components/ui/ai-voice-input";

export default function IdeatePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [speechDetected, setSpeechDetected] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Client-side only initialization
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Simulate speech detection with random intervals
  useEffect(() => {
    if (isRecording) {
      const simulateSpeechDetection = () => {
        setSpeechDetected(true);
        
        timerRef.current = setTimeout(() => {
          setSpeechDetected(false);
          
          timerRef.current = setTimeout(() => {
            if (isRecording) simulateSpeechDetection();
          }, Math.random() * 1500 + 500); // Random pause between 0.5-2s
        }, Math.random() * 2000 + 1000); // Random speech duration between 1-3s
      };
      
      // Start the first simulation after a short delay
      timerRef.current = setTimeout(simulateSpeechDetection, 800);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRecording]);
  
  const handleStartRecording = () => {
    console.log("Starting recording mode"); // Debug log
    setIsRecording(true);
  };
  
  const handleStopRecording = () => {
    console.log("Stopping recording mode"); // Debug log
    setIsRecording(false);
    setSpeechDetected(false);
  };

  const handleRecordingStart = () => {
    console.log("Recording started");
    setSpeechDetected(true);
  };

  const handleRecordingStop = (duration: number) => {
    console.log(`Recording stopped after ${duration} seconds`);
    setRecordingDuration(duration);
    setSpeechDetected(false);
  };

  return (
    <div className="h-full flex items-center justify-center py-16">
      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-white mb-3">Start Your Idea</h1>
          <p className="text-gray-400">Choose how you want to share your idea with our AI</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Voice option */}
          <button 
            className="bg-[#111111] border border-[#222] rounded-xl p-8 flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-[#161616] hover:border-yellow-400/30 hover:shadow-[0_0_20px_0px_rgba(234,179,8,0.15)] transition-all duration-200"
            onClick={handleStartRecording}
          >
            <div className="bg-yellow-400/10 rounded-full p-4 mb-4 transition-transform">
              <Mic className="h-8 w-8 text-yellow-400" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">Speak Your Idea</h2>
            <p className="text-sm text-gray-400 text-center">
              Talk through your concept naturally and our AI will process it
            </p>
          </button>
          
          {/* Text option */}
          <button 
            className="bg-[#111111] border border-[#222] rounded-xl p-8 flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-[#161616] hover:border-yellow-400/30 hover:shadow-[0_0_20px_0px_rgba(234,179,8,0.15)] transition-all duration-200"
          >
            <div className="bg-yellow-400/10 rounded-full p-4 mb-4 transition-transform">
              <Keyboard className="h-8 w-8 text-yellow-400" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">Type Your Idea</h2>
            <p className="text-sm text-gray-400 text-center">
              Write out the details of your concept in your own words
            </p>
          </button>
        </div>
      </div>
      
      {/* Voice Recording Modal */}
      <AnimatePresence>
        {isRecording && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark overlay with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-[#0A0A0A]/95 backdrop-blur-sm" />

            <motion.button 
              className="absolute top-8 right-8 text-gray-400 hover:text-white p-2 rounded-full bg-[#111111]/60 z-50"
              onClick={handleStopRecording}
              whileHover={{ scale: 1.1 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
              <div className="w-full">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                  Voice Your Idea
                </h2>
                
                {/* Insert the AIVoiceInput component */}
                <div className="bg-[#111111]/60 backdrop-blur-md rounded-2xl p-8 border border-[#222222]/50">
                  <AIVoiceInput
                    onStart={handleRecordingStart}
                    onStop={handleRecordingStop}
                    visualizerBars={64}
                    className="theme-yellow"
                  />
                </div>
                
                <p className="text-white/70 text-center mt-8 max-w-md mx-auto">
                  Share your concept and our AI will analyze it for viability, market fit, and more
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 