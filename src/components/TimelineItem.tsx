import { motion } from "framer-motion";
import { Phone, MapPin, Wind } from "lucide-react";
import type { TimelineItem as TimelineItemType } from "@/data/itinerary";

interface TimelineItemProps {
  item: TimelineItemType;
}

const TimelineItem = ({ item }: TimelineItemProps) => {
  return (
    <motion.div
      className="glass-panel p-4 rounded-xl"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-lg text-sm font-medium">
            {item.time}
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2">{item.title}</h4>
          
          {item.description && (
            <p className="text-amber-400/80 text-sm mb-2">
              {item.description}
            </p>
          )}
          
          {item.address && (
            <div className="flex items-start gap-2 text-white/60 text-sm mb-1">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{item.address}</span>
            </div>
          )}
          
          {item.hotline && (
            <a 
              href={`tel:${item.hotline.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-amber-400 text-sm glass-panel px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {item.hotline}
            </a>
          )}
          
          {item.note && (
            <div className="flex items-start gap-2 text-white/60 text-sm mt-2">
              <Wind className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="italic">{item.note}</span>
            </div>
          )}

          {item.isHighlight && (
            <div className="mt-2 inline-block px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 text-xs">
              ⭐ Highlight
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
