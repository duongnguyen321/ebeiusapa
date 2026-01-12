import { cn } from '@/lib/utils';
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

const BirthdayButton = () => {
  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => 
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <motion.button
      onClick={triggerConfetti}
      className={cn("mt-6 w-full glass-panel p-4 rounded-2xl flex items-center justify-center gap-3 text-pink-400 hover:bg-pink-500/20 transition-colors")}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Heart className="w-6 h-6 fill-pink-400" />
      <span className="font-semibold">Chúc mừng sinh nhật! 🎉</span>
    </motion.button>
  );
};

export default BirthdayButton;
