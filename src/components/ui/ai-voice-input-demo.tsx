import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { useState } from "react";

export function AIVoiceInputDemo() {
  // Remove the unused recordings state
  // const [recordings, setRecordings] = useState<{ duration: number; timestamp: Date }[]>([]);

  const handleStop = (duration: number) => {
    // No need to store recordings if they're not being used
    console.log(`Recording stopped after ${duration} seconds`);
  };

  return (
    <div className="space-y-8">
        <div className="space-y-4">
          <AIVoiceInput 
            onStart={() => console.log('Recording started')}
            onStop={handleStop}
          />   
      </div>
    </div>
  );
} 