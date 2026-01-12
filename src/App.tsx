import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Index from '@/pages/Index';
import TimelinePage from '@/pages/TimelinePage';
import GamePlayPage from '@/pages/GamePlayPage';
import PassportPage from '@/pages/PassportPage';
import NotFound from '@/pages/NotFound';
import LiquidGlassFilters from '@/components/LiquidGlassFilters';
import { useImagePrefetch } from './hooks/useImagePrefetch';
import { isRestricted } from '@/utils/restriction';

import { toast, Toaster } from 'sonner';
import MainLayout from '@/layouts/MainLayout';

const App = () => {
	useImagePrefetch();

	return (
		<>
			<Toaster
				position='top-center'
				visibleToasts={4}
				toastOptions={{
					classNames: {
						toast:
							'group glass-toast rounded-2xl text-white shadow-2xl backdrop-blur-xl data-[type=error]:!border-red-500/50 data-[type=error]:!bg-red-500/10 data-[type=success]:!border-green-500/50 data-[type=success]:!bg-green-500/10 data-[type=warning]:!border-amber-500/50 data-[type=warning]:!bg-amber-500/10 data-[type=info]:!border-blue-500/50 data-[type=info]:!bg-blue-500/10',
						title:
							'font-display font-semibold tracking-wide text-amber-400 data-[type=error]:text-red-400 data-[type=success]:text-green-400',
						description: 'text-white/80 font-light',
					},
				}}
			/>
			<LiquidGlassFilters />
			<BrowserRouter>
				<Routes>
					<Route element={<RootLayout />}>
						<Route path='/' element={<Index />} />

						{/* Main Application Layout with Bottom Navbar */}
						<Route element={<MainLayout />}>
							<Route path='/timeline' element={<TimelinePage />} />

							{/* Restricted Routes */}
							<Route
								path='/passport'
								element={
									isRestricted() ? (
										<Navigate to='/timeline' replace />
									) : (
										<PassportPage />
									)
								}
							/>
							<Route
								path='/games/:gameId'
								element={
									isRestricted() ? (
										<Navigate to='/timeline' replace />
									) : (
										<GamePlayPage />
									)
								}
							/>
						</Route>

						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
