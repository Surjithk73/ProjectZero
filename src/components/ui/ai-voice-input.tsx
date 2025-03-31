"use client";

import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  visualizerBars?: number;
  demoMode?: boolean;
  demoInterval?: number;
  className?: string;
}

export function AIVoiceInput({
  onStart,
  onStop,
  visualizerBars = 48,
  demoMode = false,
  demoInterval = 3000,
  className
}: AIVoiceInputProps) {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      onStop?.(time);
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted, time, onStart, onStop]);

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, demoInterval);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo, demoInterval]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <div className="relative">
          {/* Enhanced wavy glow effect */}
          <div className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-500",
            submitted || hover ? "opacity-100" : "opacity-0"
          )}>
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-yellow-400/15 animate-pulse" 
                style={{ 
                  margin: '-1rem',
                  filter: 'blur(10px)',
                  animationDuration: "1.5s" 
                }}></div>
            
            {/* Pulsing rings */}
            {(submitted || hover) && isClient && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 pulse-ring" style={{ animationDelay: "0s" }}></div>
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 pulse-ring" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/10 pulse-ring" style={{ animationDelay: "1s" }}></div>
              </>
            )}
            
            {/* Wavy circles - more of them and with varying speeds */}
            {isClient && [...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute inset-0 rounded-full border border-yellow-400/20"
                style={{
                  animation: `wavy-glow ${2 + i * 0.5}s infinite ease-in-out ${i * 0.3}s`,
                  transform: `scale(${1 + (i * 0.2)})`,
                  opacity: submitted ? 0.7 - (i * 0.1) : 0.4 - (i * 0.05),
                  filter: 'blur(1px)'
                }}
              ></div>
            ))}
            
            {/* Particle dots */}
            {submitted && isClient && [...Array(12)].map((_, i) => (
              <div 
                key={`particle-${i}`} 
                className="absolute rounded-full bg-yellow-400/40"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  top: `${50 + (Math.random() * 50 - 25)}%`,
                  left: `${50 + (Math.random() * 50 - 25)}%`,
                  animation: `particle-float ${3 + Math.random() * 2}s infinite ease-in-out ${Math.random() * 2}s`,
                  filter: 'blur(1px)'
                }}
              ></div>
            ))}
          </div>
          
          <button
            className={cn(
              "group w-16 h-16 rounded-full flex items-center justify-center transition-all relative z-10 hover-glow",
              submitted
                ? "bg-yellow-400/15 mic-active"
                : hover 
                  ? "bg-yellow-400/10 scale-110" 
                  : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
            )}
            type="button"
            onClick={handleClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {submitted ? (
              <div
                className="w-6 h-6 rounded-sm animate-pulse bg-black dark:bg-yellow-400 cursor-pointer pointer-events-auto"
                style={{ animationDuration: "1.5s" }}
              />
            ) : (
              <Mic className={cn(
                "w-6 h-6 transition-all duration-300", 
                hover ? "text-yellow-400 scale-110" : "text-black/70 dark:text-yellow-400"
              )} />
            )}
          </button>
        </div>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-black/70 dark:text-white/70"
              : "text-black/30 dark:text-white/30"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-0.5">
          {[...Array(visualizerBars)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "bg-black/50 dark:bg-white/50 animate-pulse"
                  : "bg-black/10 dark:bg-white/10 h-1"
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-black/70 dark:text-white/70">
          {submitted ? "Listening..." : "Click to speak"}
        </p>
      </div>

      {/* Add keyframes for enhanced animations */}
      <style jsx global>{`
        @keyframes wavy-glow {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        
        @keyframes particle-float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-20px) translateX(${Math.random() * 20 - 10}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
} 