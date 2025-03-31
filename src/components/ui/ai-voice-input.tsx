"use client";

import { Mic, Pause, Play, StopCircle } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number, transcript?: string) => void;
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
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Audio recording references
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const MAX_RECORDING_TIME = 180; // 3 minutes in seconds

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendToElevenLabs = async (audioBlob: Blob) => {
    try {
      // Create form data to send the audio file
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.mp3");
      // Use correct model_id with underscore instead of hyphen
      formData.append("model_id", "scribe_v1");
      
      console.log("Sending audio to ElevenLabs...");
      
      const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "xi-api-key": "sk_7344cac779c6f60acd3359f707051a171a4ee8f9bbf2f23c"
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("ElevenLabs API error response:", errorText);
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("ElevenLabs API response:", data);
      setTranscript(data.text || "No transcription available");
    } catch (error) {
      console.error("Error sending audio to ElevenLabs:", error);
      setTranscript("Error transcribing audio");
    }
  };

  const stopRecording = useCallback(async () => {
    if (!mediaRecorderRef.current) return;
    
    mediaRecorderRef.current.stop();
    setIsProcessing(true);
    
    // Add a small delay to ensure we have all audio chunks
    setTimeout(async () => {
      // Use mp3 format which is better supported by the API
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
      await sendToElevenLabs(audioBlob);
      
      // Stop all audio tracks
      if (mediaRecorderRef.current) {
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      setSubmitted(false);
      setPaused(false);
      onStop?.(time, transcript);
      setIsProcessing(false);
    }, 500);
  // Include all dependencies that are used inside the callback
  }, [onStop, time, transcript]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted && !paused) {
      if (!isDemo) onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => {
          // Auto-stop recording after 3 minutes
          if (t >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return t + 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [submitted, paused, isDemo, onStart, stopRecording]);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.start(1000);
      setSubmitted(true);
      setPaused(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setPaused(false);
    }
  };

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
      return;
    }
    
    if (!submitted) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div className={cn("w-full py-6", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-4">
        <span
          className={cn(
            "font-mono text-xl font-semibold transition-opacity duration-300",
            submitted
              ? "text-black/80 dark:text-white/80"
              : "text-black/40 dark:text-white/40"
          )}
        >
          {formatTime(time)}{time >= MAX_RECORDING_TIME ? " (max)" : ""}
        </span>

        <div className="h-8 w-80 flex items-center justify-center gap-1 my-3">
          {[...Array(visualizerBars)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all duration-300",
                submitted && !paused
                  ? "bg-black/60 dark:bg-white/60 animate-pulse"
                  : "bg-black/10 dark:bg-white/10 h-2"
              )}
              style={
                submitted && !paused && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className={cn(
          "min-h-8 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300", 
          isProcessing 
            ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
            : submitted 
              ? paused 
                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300" 
                : "bg-green-500/20 text-green-700 dark:text-green-300" 
              : "text-black/70 dark:text-white/70"
        )}>
          {isProcessing 
            ? "Processing speech..." 
            : submitted 
              ? paused ? "Paused" : "Listening..." 
              : "Click to speak"}
        </p>
        
        <div className="flex items-center gap-6 mt-4">
          <button
            className={cn(
              "group w-16 h-16 rounded-xl flex items-center justify-center transition-all relative cursor-pointer",
              submitted
                ? "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 shadow-md"
                : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
            )}
            type="button"
            onClick={handleClick}
            disabled={isProcessing}
            aria-label={submitted ? "Stop recording" : "Start recording"}
          >
            {submitted ? (
              <StopCircle className="w-7 h-7 text-red-500 dark:text-red-400" />
            ) : (
              <>
                {/* Pulsing effect ring */}
                <span className="absolute inset-0 rounded-xl border border-black/20 dark:border-yellow-400/30 animate-ping opacity-75"></span>
                <span className="absolute inset-0 rounded-xl border-2 border-black/10 dark:border-yellow-400/20 animate-pulse"></span>
                <Mic className="w-7 h-7 text-black/70 dark:text-white/70 relative z-10" />
              </>
            )}
          </button>

          {submitted && (
            <button
              className="w-16 h-16 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer shadow-md"
              onClick={paused ? resumeRecording : pauseRecording}
              disabled={isProcessing}
              aria-label={paused ? "Resume recording" : "Pause recording"}
            >
              {paused ? (
                <Play className="w-6 h-6 text-green-500 dark:text-green-400" />
              ) : (
                <Pause className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
              )}
            </button>
          )}
        </div>
        
        {transcript && (
          <div className="mt-6 p-4 w-full rounded-md bg-black/5 dark:bg-white/5 text-sm">
            <p className="font-semibold mb-2 text-xs opacity-70">Transcription:</p>
            <p>{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
} 