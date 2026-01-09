import { motion } from "framer-motion";
import { Umbrella } from "lucide-react";
import Countdown from "./Countdown";
import SlideToUnlock from "./SlideToUnlock";

interface IntroViewProps {
  targetDate: Date;
  onUnlock: () => void;
}

const IntroView = ({ targetDate, onUnlock }: IntroViewProps) => {
  return (
    <motion.div
      key="intro"
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mist Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-slate-800/20 via-slate-700/10 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1 }}
        >
          <Umbrella className="w-12 h-12 md:w-16 md:h-16 text-amber-400 mx-auto mb-4 md:mb-6 animate-pulse" />
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-playfair text-white mb-3 md:mb-4">
            THE MISTY DATE
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-1 md:mb-2 tracking-wide">
            Sapa, Tháng Một 2026
          </p>
          
          <p className="text-sm md:text-base text-amber-400/80 mb-8 md:mb-12 italic">
            Bốn ngày giữa sương & thời gian
          </p>
        </motion.div>
        
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 25, mass: 1 }}
        >
          <Countdown targetDate={targetDate} />
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 25, mass: 1 }}
        >
          <SlideToUnlock onUnlock={onUnlock} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroView;
