"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface LiveTranscriptProps {
  transcript: Array<{ text: string; speaker: "AI" | "Human" }>;
  isPlaying: boolean;
  onTogglePlayback: () => void;
}

export default function LiveTranscript({
  transcript,
  isPlaying,
  onTogglePlayback,
}: LiveTranscriptProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl p-4 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-zinc-300">
            Live Transcript
          </h2>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onTogglePlayback}
          className="size-8 rounded-full"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div
        ref={scrollAreaRef}
        className="h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
      >
        {transcript.length === 0 ? (
          <p className="text-zinc-500 text-center italic">
            Transcript will appear here...
          </p>
        ) : (
          <div className="space-y-4">
            {transcript.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg ${
                  entry.speaker === "AI"
                    ? "bg-green-500/10 border border-green-500/20 ml-4"
                    : "bg-blue-500/10 border border-blue-500/20 mr-4"
                }`}
              >
                <div className="text-sm font-medium mb-1 flex items-center gap-2 text-zinc-400">
                  {entry.speaker === "AI" ? "🤖 AI" : "👤 Human"}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {entry.text}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
