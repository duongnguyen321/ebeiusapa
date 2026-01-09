import { motion } from "framer-motion";
import { Power } from "lucide-react";
import type { DaySchedule } from "@/data/itinerary";
import DayCard from "./DayCard";

interface TimelineViewProps {
  itinerary: DaySchedule[];
  expandedDay: number | null;
  onToggleDay: (dayId: number) => void;
  onReset: () => void;
}

const TimelineView = ({ 
  itinerary, 
  expandedDay, 
  onToggleDay,
  onReset
}: TimelineViewProps) => {
  return (
    <motion.div
      key="timeline"
      className="min-h-screen p-6 md:p-12 relative z-10"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1 }}
    >
      {/* Exit Button - Floating Action Button (Bottom Right) */}
      <button
        onClick={onReset}
        className="fixed bottom-8 right-8 z-20 w-14 h-14 flex items-center justify-center glass-panel rounded-full hover:bg-white/20 transition-all hover:scale-110 shadow-2xl"
        aria-label="Thoát"
      >
        <Power className="w-6 h-6 text-white" />
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-playfair text-white mb-2 md:mb-3">
            THE MISTY DATE
          </h1>
          <p className="text-sm md:text-base text-white/60">
            Hành trình 4 ngày 3 đêm tại Sapa
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {itinerary.map((day, idx) => (
            <motion.div
              key={day.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: idx * 0.08,
                type: "spring",
                stiffness: 200,
                damping: 30,
                mass: 0.8
              }}
            >
              <DayCard
                day={day}
                isExpanded={expandedDay === day.id}
                onToggle={() => onToggleDay(day.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineView;
