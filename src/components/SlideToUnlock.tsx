import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useVersion } from "@/contexts/VersionContext";

interface SlideToUnlockProps {
  onUnlock: () => void;
}

const SlideToUnlock = ({ onUnlock }: SlideToUnlockProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(340);
  const { localVersion, remoteVersion } = useVersion();

  // Calculate max drag based on actual container width
  useEffect(() => {
    const updateMaxDrag = () => {
      if (constraintsRef.current) {
        const containerWidth = constraintsRef.current.offsetWidth;
        const buttonWidth = 48; // w-12 = 3rem = 48px
        const padding = 16; // left-2 + right padding = 8px + 8px
        setMaxDrag(containerWidth - buttonWidth - padding);
      }
    };

    updateMaxDrag();
    window.addEventListener("resize", updateMaxDrag);
    return () => window.removeEventListener("resize", updateMaxDrag);
  }, []);

  const UNLOCK_THRESHOLD = maxDrag * 0.6; // 60% of max drag to unlock

  // Transform x position to progress bar width (extended beyond button)
  const progressWidth = useTransform(x, [0, maxDrag], [72, maxDrag + 76]);

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
      className="relative w-full max-w-md mx-auto h-16 rounded-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)",
      }}
    >
      {/* Specular highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.4) 80%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-medium tracking-wider">
        <ChevronRight className="w-5 h-5 mr-2 animate-pulse" />
        BẮT ĐẦU HÀNH TRÌNH
        <ChevronRight className="w-5 h-5 ml-2 animate-pulse" />
      </div>

      {/* Progress bar with liquid effect */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 pointer-events-none overflow-hidden rounded-r-full"
        style={{
          width: progressWidth,
          willChange: "width",
          background:
            "linear-gradient(90deg, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.35) 70%, rgba(251,191,36,0.5) 100%)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 0 20px rgba(251,191,36,0.3), inset 0 0 30px rgba(251,191,36,0.1)",
        }}
      >
        {/* Animated shimmer gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 75%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />
        {/* Glow edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-4"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.6) 100%)",
            filter: "blur(4px)",
          }}
        />
        <div className="absolute right-0 left-0 top-0 bottom-0 flex items-end justify-center">
			<span className="text-xs opacity-20">{localVersion}{remoteVersion && ` (${remoteVersion})`}</span>
		</div>
      </motion.div>

      {/* Draggable slider with glow */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, willChange: "transform" }}
        className="absolute left-2 top-2 bottom-2 w-12 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 40, mass: 0.8 }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            boxShadow:
              "0 0 20px rgba(251,191,36,0.5), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </div>
      </motion.div>
    </div>
  );
};

export default SlideToUnlock;
