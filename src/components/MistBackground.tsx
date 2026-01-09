import { motion } from "framer-motion";

const MistBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 mist-gradient" />
      
      {/* Animated mist layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 - i * 0.03 }}
          transition={{ duration: 2, delay: i * 0.5 }}
        >
          <motion.div
            className="absolute w-[200%] h-full"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.03 - i * 0.01}), transparent)`,
              top: `${20 + i * 25}%`,
            }}
            animate={{
              x: ["-100%", "0%"],
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      ))}
      
      {/* Radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default MistBackground;
