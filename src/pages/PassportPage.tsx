import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { usePassport, PassportProvider } from "@/contexts/PassportContext";
import { RoleSelector } from "@/components/passport/RoleSelector";
import { PassportDashboard } from "@/components/passport/PassportDashboard";
import { FloatingSOS } from "@/components/passport/FloatingSOS";
import { PageTransition } from "@/components/PageTransition";

function PassportContent() {
  const navigate = useNavigate();
  const { role } = usePassport();
  const [showDashboard, setShowDashboard] = useState(!!role);

  const handleRoleSelected = () => {
    setShowDashboard(true);
  };

  const handleBack = () => {
    navigate("/timeline");
  };

  return (
    <div className={cn("min-h-screen relative")}>
      <AnimatePresence mode="wait">
        {!showDashboard || !role ? (
          <motion.div
            key="role-selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <RoleSelector onComplete={handleRoleSelected} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PassportDashboard onBack={handleBack} />
            <FloatingSOS />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PassportPage() {
  return (
    <PageTransition variant="slideUp">
      <PassportProvider>
        <PassportContent />
      </PassportProvider>
    </PageTransition>
  );
}
