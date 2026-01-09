import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface SlideToUnlockProps {
  onUnlock: () => void;
}

const SlideToUnlock = ({ onUnlock }: SlideToUnlockProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const trackWidth = 280;
  const thumbSize = 56;
  const maxDrag = trackWidth - thumbSize - 8;

  const progress = useTransform(x, [0, maxDrag], [0, 1]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.3], [1, 0]);
  const bgOpacity = useTransform(x, [0, maxDrag], [0.1, 0.3]);
  const thumbScale = useTransform(x, [maxDrag * 0.8, maxDrag], [1, 1.1]);

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    
    if (currentX >= maxDrag * 0.9) {
      animate(x, maxDrag, { type: "spring", stiffness: 400, damping: 30 });
      setTimeout(onUnlock, 200);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    <div className="relative">
      <motion.div
        ref={constraintsRef}
        className="relative glass-panel rounded-full overflow-hidden"
        style={{ 
          width: trackWidth, 
          height: thumbSize + 8,
        }}
      >
        {/* Animated background fill */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/30"
          style={{ opacity: bgOpacity, scaleX: progress, transformOrigin: "left" }}
        />

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </div>

        {/* Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pl-14"
          style={{ opacity: textOpacity }}
        >
          <span className="text-sm text-white/60 font-medium tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Trượt để khám phá
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </span>
        </motion.div>

        {/* Draggable thumb */}
        <motion.div
          className="absolute top-1 left-1 cursor-grab active:cursor-grabbing"
          style={{ x, scale: thumbScale }}
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.95 }}
        >
          <div 
            className={`
              flex items-center justify-center rounded-full
              bg-gradient-to-br from-amber-400 to-amber-600
              shadow-lg shadow-amber-500/30
              transition-shadow duration-300
              ${isDragging ? 'shadow-amber-500/50' : ''}
            `}
            style={{ width: thumbSize, height: thumbSize }}
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronRight className="w-6 h-6 text-slate-900" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SlideToUnlock;
