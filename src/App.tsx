import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Index from "@/pages/Index";
import TimelinePage from "@/pages/TimelinePage";
import GamePlayPage from "@/pages/GamePlayPage";
import PassportPage from "@/pages/PassportPage";
import NotFound from "@/pages/NotFound";
import LiquidGlassFilters from "@/components/LiquidGlassFilters";
import VersionManager from "@/components/VersionManager";
import { useImagePrefetch } from "./hooks/useImagePrefetch";

const App = () => {
  useImagePrefetch();

  return (
    <>
      <VersionManager />
      <LiquidGlassFilters />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/passport" element={<PassportPage />} />
            <Route path="/games/:gameId" element={<GamePlayPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
