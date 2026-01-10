import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Index from '@/pages/Index';
import TimelinePage from '@/pages/TimelinePage';
import GamePlayPage from '@/pages/GamePlayPage';
import NotFound from '@/pages/NotFound';
import LiquidGlassFilters from '@/components/LiquidGlassFilters';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<LiquidGlassFilters />
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route element={<RootLayout />}>
						<Route path='/' element={<Index />} />
						<Route path='/timeline' element={<TimelinePage />} />
						<Route path='/games/:gameId' element={<GamePlayPage />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
