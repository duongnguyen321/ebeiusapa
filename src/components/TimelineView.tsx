import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Heart, CalendarDays } from "lucide-react";
import DayCard from "./DayCard";
import DayModal from "./DayModal";
import { itinerary, type DaySchedule } from "@/data/itinerary";

const TimelineView = () => {
  const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="min-h-screen py-8 px-4 md:px-6"
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-white/70">Sapa, Việt Nam</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl mb-2">
            <span className="text-gradient">THE MISTY</span>
            <span className="text-white"> DATE</span>
          </h1>

          <p className="text-white/50 flex items-center justify-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <span>15 - 18 Tháng 1, 2026</span>
          </p>
        </motion.div>

        {/* Day Cards */}
        <div className="space-y-4 relative">
          {itinerary.map((day, index) => (
            <DayCard
              key={day.id}
              day={day}
              index={index}
              onClick={() => setSelectedDay(day)}
              isSelected={selectedDay?.id === day.id}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 pb-8"
        >
          <p className="text-white/30 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for you
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDay && (
          <DayModal 
            day={selectedDay} 
            onClose={() => setSelectedDay(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TimelineView;
