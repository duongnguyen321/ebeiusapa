import { motion } from "framer-motion";
import { MapPin, Heart } from "lucide-react";
import Countdown from "./Countdown";
import SlideToUnlock from "./SlideToUnlock";
import { targetDate } from "@/data/itinerary";

interface IntroViewProps {
  onUnlock: () => void;
}

const IntroView = ({ onUnlock }: IntroViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-y-auto py-12"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-amber-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Heart className="w-8 h-8" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-10 text-amber-500/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <MapPin className="w-6 h-6" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6"
        >
          <span className="text-amber-400">✨</span>
          <span className="text-sm text-white/70">Một lời mời đặc biệt</span>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
          <span className="text-gradient">THE MISTY</span>
          <br />
          <span className="text-white">DATE</span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
          Sapa • 4 Ngày 3 Đêm
          <br />
          <span className="text-amber-400/80">15 - 18 Tháng 1, 2026</span>
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
        className="mb-12"
      >
        <p className="text-center text-white/40 text-sm mb-4 uppercase tracking-widest">
          Đếm ngược đến ngày khởi hành
        </p>
        <Countdown targetDate={targetDate} />
      </motion.div>

      {/* Slide to unlock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.7 }}
      >
        <SlideToUnlock onUnlock={onUnlock} />
      </motion.div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-white/30 text-xs"
      >
        Được tạo với ❤️ cho em
      </motion.p>
    </motion.div>
  );
};

export default IntroView;
