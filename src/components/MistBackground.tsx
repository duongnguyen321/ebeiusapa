import { motion } from "framer-motion";

const MistBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 mist-gradient" />
      
      {/* Floating mist layers */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full"
          style={{
            height: `${150 + i * 50}px`,
            top: `${10 + i * 18}%`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,${0.03 - i * 0.004}) 20%, 
              rgba(255,255,255,${0.05 - i * 0.006}) 50%, 
              rgba(255,255,255,${0.03 - i * 0.004}) 80%, 
              transparent 100%
            )`,
            filter: `blur(${40 + i * 10}px)`,
          }}
          animate={{
            x: ["-20%", "20%", "-20%"],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Vertical mist wisps */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wisp-${i}`}
          className="absolute"
          style={{
            width: "300px",
            height: "100%",
            left: `${20 + i * 30}%`,
            background: `linear-gradient(180deg, 
              transparent 0%, 
              rgba(255,255,255,0.02) 30%, 
              rgba(255,255,255,0.04) 50%, 
              rgba(255,255,255,0.02) 70%, 
              transparent 100%
            )`,
            filter: "blur(60px)",
          }}
          animate={{
            y: ["-10%", "10%", "-10%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20 + i * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}
      
      {/* Radial ambient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Bottom mist bank */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: "linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 100%)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default MistBackground;
