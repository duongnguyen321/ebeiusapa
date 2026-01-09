import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SlideToUnlockProps {
  onUnlock: () => void;
}

const SlideToUnlock = ({ onUnlock }: SlideToUnlockProps) => {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const UNLOCK_THRESHOLD = 200;
  const MAX_DRAG = 340;

  // Transform x position to progress bar width
  const progressWidth = useTransform(x, [0, MAX_DRAG], [56, MAX_DRAG + 56]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > UNLOCK_THRESHOLD) {
      onUnlock();
    } else {
      // Reset to start with spring animation
      x.set(0);
    }
  };

  return (
    <div 
      ref={constraintsRef}
      className="relative w-full max-w-md mx-auto h-16 glass-panel rounded-full overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm font-medium tracking-wider">
        <ChevronRight className="w-5 h-5 mr-2 animate-pulse" />
        TRƯỢT ĐỂ BẮT ĐẦU HÀNH TRÌNH
        <ChevronRight className="w-5 h-5 ml-2 animate-pulse" />
      </div>
      
      {/* Progress bar */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-amber-500/10 pointer-events-none"
        style={{ 
          width: progressWidth,
          willChange: "width"
        }}
      />
      
      {/* Draggable slider */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: MAX_DRAG }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, willChange: "transform" }}
        className="absolute left-2 top-2 bottom-2 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center shadow-lg z-10"
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 40, mass: 0.8 }}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.div>
    </div>
  );
};

export default SlideToUnlock;
