import { motion } from "framer-motion";
import { Calendar, Thermometer, Shirt, Sparkles } from "lucide-react";
import type { DaySchedule } from "@/data/itinerary";

interface DayCardProps {
  day: DaySchedule;
  onClick: () => void;
  index: number;
  isSelected?: boolean;
}

const DayCard = ({ day, onClick, index, isSelected }: DayCardProps) => {
  // Very fast spring - matches modal speed
  const layoutTransition = {
    type: "spring" as const,
    stiffness: 700,
    damping: 35,
    mass: 0.5,
  };

  return (
    <motion.div
      layoutId={`day-card-${day.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: index * 0.08,
        layout: layoutTransition,
      }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-panel-hover rounded-3xl p-6 cursor-pointer relative overflow-hidden group"
      style={{ zIndex: isSelected ? 100 : 1 }}
    >
      {/* Birthday special glow */}
      {day.isBirthday && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-pink-500/10 to-purple-500/10"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Ngày {day.id}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-white">
              {day.dateLabel}
            </h3>
          </div>

          <div className="text-4xl">
            {day.weather.icon}
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white/70 font-medium mb-4 flex items-center gap-2">
          {day.isBirthday && <Sparkles className="w-4 h-4 text-amber-400" />}
          {day.title}
        </p>

        {/* Quick info */}
        <div className="flex flex-wrap gap-3 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4" />
            <span>{day.weather.temp}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shirt className="w-4 h-4" />
            <span className="truncate max-w-[180px]">{day.outfit.split(",")[0]}</span>
          </div>
        </div>

        {/* Activity preview */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-sm">
              {day.timeline.length} hoạt động
            </span>
            <motion.span 
              className="text-amber-400 text-sm font-medium"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Xem chi tiết →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DayCard;
