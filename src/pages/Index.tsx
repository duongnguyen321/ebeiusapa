import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { itinerary, targetDate } from "@/data/itinerary";
import NoiseBackground from "@/components/NoiseBackground";
import IntroView from "@/components/IntroView";
import TimelineView from "@/components/TimelineView";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const handleToggleDay = (dayId: number) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  const handleReset = () => {
    setExpandedDay(null);
    setIsUnlocked(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-slate-900">
      <NoiseBackground />
      
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <IntroView 
            targetDate={targetDate} 
            onUnlock={() => setIsUnlocked(true)} 
          />
        ) : (
          <TimelineView
            itinerary={itinerary}
            expandedDay={expandedDay}
            onToggleDay={handleToggleDay}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
