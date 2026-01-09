import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MistBackground from "@/components/MistBackground";
import IntroView from "@/components/IntroView";
import TimelineView from "@/components/TimelineView";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Animated mist background */}
      <MistBackground />

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <IntroView key="intro" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <TimelineView key="timeline" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
