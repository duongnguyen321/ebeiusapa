import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Calendar, 
  Thermometer, 
  Shirt, 
  MapPin, 
  Phone, 
  Clock, 
  Heart,
  Sparkles,
  MessageCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import type { DaySchedule } from "@/data/itinerary";
import { useState } from "react";

interface DayModalProps {
  day: DaySchedule;
  onClose: () => void;
}

const DayModal = ({ day, onClose }: DayModalProps) => {
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  const triggerConfetti = () => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#ec4899', '#f472b6'],
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f472b6', '#fda4af'],
      });
    }, 150);

    setShowBirthdayMessage(true);
    setTimeout(() => setShowBirthdayMessage(false), 4000);
  };

  // Fast spring for snappy iOS-like animations
  const springConfig = {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
    mass: 0.8,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        layoutId={`day-card-${day.id}`}
        layout
        transition={springConfig}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden border border-white/[0.12] shadow-2xl"
        style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(40px)" }}
      >
        {/* Birthday gradient */}
        {day.isBirthday && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-pink-500/5 to-purple-500/5" />
        )}

        {/* Scrollable content */}
        <div className="relative z-10 overflow-y-auto max-h-[90vh] scrollbar-hide">
          {/* Header */}
          <div className="sticky top-0 z-20 border-0 border-b border-white/10 p-6" style={{ background: "rgba(15, 23, 42, 0.98)", backdropFilter: "blur(40px)" }}>
            <div className="flex items-start justify-between">
              <div>
                <motion.div 
                  layoutId={`day-date-${day.id}`}
                  layout
                  transition={springConfig}
                  className="flex items-center gap-2 text-amber-400 mb-1"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Ngày {day.id}</span>
                </motion.div>
                <motion.h2 
                  layoutId={`day-title-${day.id}`}
                  layout
                  transition={springConfig}
                  className="font-display text-3xl md:text-4xl text-white"
                >
                  {day.dateLabel}
                </motion.h2>
              </div>

              <div className="flex items-center gap-3">
                <motion.div 
                  layoutId={`day-weather-${day.id}`}
                  layout
                  transition={springConfig}
                  className="text-4xl"
                >
                  {day.weather.icon}
                </motion.div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="glass-button p-2 rounded-full"
                >
                  <X className="w-5 h-5 text-white/70" />
                </motion.button>
              </div>
            </div>

            <motion.p 
              layoutId={`day-subtitle-${day.id}`}
              layout
              transition={springConfig}
              className="text-white/70 font-medium mt-2 flex items-center gap-2"
            >
              {day.isBirthday && <Sparkles className="w-4 h-4 text-amber-400" />}
              {day.title}
            </motion.p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Weather & Outfit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-sm font-medium">Thời tiết</span>
                </div>
                <p className="text-white text-sm">{day.weather.description}</p>
                <p className="text-white/50 text-sm">{day.weather.temp}</p>
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Shirt className="w-4 h-4" />
                  <span className="text-sm font-medium">Outfit</span>
                </div>
                <p className="text-white text-sm leading-relaxed">{day.outfit}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-white/50 text-sm uppercase tracking-wider">Lịch trình</h3>
              
              {day.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    delay: index * 0.05 
                  }}
                  className={`relative pl-6 pb-6 border-l-2 ${
                    item.isHighlight ? 'border-amber-500/50' : 'border-white/10'
                  } last:pb-0`}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 ${
                      item.isHighlight 
                        ? 'bg-amber-500 border-amber-400' 
                        : 'bg-slate-800 border-white/20'
                    }`}
                  />

                  {/* Time */}
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 font-medium">{item.time}</span>
                  </div>

                  {/* Content */}
                  <div className={`glass-panel rounded-2xl p-4 ${
                    item.isHighlight ? 'border-amber-500/20' : ''
                  }`}>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    {item.description && (
                      <p className="text-white/60 text-sm mb-3">{item.description}</p>
                    )}

                    {/* Address */}
                    {item.address && (
                      <div className="flex items-start gap-2 text-sm text-white/50 mb-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{item.address}</span>
                      </div>
                    )}

                    {/* Phone */}
                    {item.hotline && (
                      <motion.a
                        href={`tel:${item.hotline.replace(/\s/g, '')}`}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 glass-button px-4 py-2 rounded-full text-sm text-amber-400 mt-2"
                      >
                        <Phone className="w-4 h-4" />
                        {item.hotline}
                      </motion.a>
                    )}

                    {/* Note */}
                    {item.note && (
                      <div className="flex items-start gap-2 text-sm text-amber-400/70 mt-3 pt-3 border-t border-white/10">
                        <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{item.note}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Birthday floating button */}
        {day.isBirthday && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={triggerConfetti}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/30 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </motion.div>
          </motion.button>
        )}

        {/* Birthday message popup */}
        <AnimatePresence>
          {showBirthdayMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed inset-x-4 bottom-28 mx-auto max-w-sm rounded-3xl p-6 text-center z-50 border border-pink-500/30 shadow-2xl"
              style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(40px)" }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-5xl">🎂</span>
              </motion.div>
              <h3 className="font-display text-2xl text-gradient mt-4">
                Happy Birthday!
              </h3>
              <p className="text-white/60 mt-2">
                Chúc em sinh nhật vui vẻ, mãi xinh đẹp và hạnh phúc! 🥳
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DayModal;
