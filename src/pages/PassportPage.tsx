import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { usePassport, PassportProvider } from "@/contexts/PassportContext";
import { PassportDashboard } from "@/components/passport/PassportDashboard";
import { PageTransition } from "@/components/PageTransition";

function PassportContent() {
  const navigate = useNavigate();


  const handleBack = () => {
    navigate("/timeline");
  };

  return (
    <div className={cn("min-h-screen relative")}>
      <PassportDashboard onBack={handleBack} />
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
