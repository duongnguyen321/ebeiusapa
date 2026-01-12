import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Smile, Ticket } from 'lucide-react';
import BottomNavbar from '@/components/BottomNavbar';
import BottomSheet from '@/components/BottomSheet';
import EmergencyPanel from '@/components/EmergencyPanel';
import GamesModal from '@/components/GamesModal';
import MoodStation from '@/components/MoodStation';
import VoucherWallet from '@/components/VoucherWallet';
import { ScratchCard } from '@/components/ScratchCard';
import { LetterCard, SecretLetter } from '@/components/SecretLetter';
import { loveLetters } from '@/data/letters';
import { useTrip } from '@/contexts/TripContext';

export default function MainLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isUnlocked, lockApp } = useTrip();

	// Modals State
	const [showScratchCard, setShowScratchCard] = useState(false);
	const [showLetters, setShowLetters] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
	const [showGames, setShowGames] = useState(false);
	const [showMood, setShowMood] = useState(false);
	const [showWallet, setShowWallet] = useState(false);
	const [showEmergency, setShowEmergency] = useState(false);

	// Protect route - if not unlocked, redirect to login (index)
    // Note: This logic might exist in individual pages or RootLayout, but good to have a check here if used for protected pages.
    // However, since Index is outside MainLayout, we should check if we are on a protected route.
	useEffect(() => {
		if (!isUnlocked && location.pathname !== '/') {
			navigate('/', { replace: true });
		}
	}, [isUnlocked, navigate, location.pathname]);

    // Re-open modals from navigation state (if navigating back from a game, etc.)
	useEffect(() => {
		if (location.state?.showGames) {
			setShowGames(true);
		}
	}, [location.state]);

	const handleSelectGame = (gameId: string) => {
		setShowGames(false);
		navigate(`/games/${gameId}`);
	};

    const isGamePage = location.pathname.startsWith('/games/');

	return (
		<div
			className={`min-h-screen relative z-10 ${
				isGamePage ? 'pb-0' : 'pb-24 md:pb-28'
			}`}
		>
            {/* Page Content */}
			<Outlet />

			{/* Emergency Panel */}
			<EmergencyPanel
				isOpen={showEmergency}
				onClose={() => setShowEmergency(false)}
			/>

			{/* Bottom Navigation Bar */}
			{!isGamePage && (
				<BottomNavbar
					onEmergency={() => setShowEmergency(true)}
					onScratchCard={() => setShowScratchCard(true)}
					onLetters={() => setShowLetters(!showLetters)}
					onGames={() => setShowGames(true)}
					onMood={() => setShowMood(!showMood)}
					onWallet={() => setShowWallet(!showWallet)}
					onExit={() => lockApp()}
					showLettersActive={showLetters}
					showGamesActive={showGames}
					showMoodActive={showMood}
					showWalletActive={showWallet}
				/>
			)}

			{/* Love Letters Bottom Sheet Modal */}
			<BottomSheet
				isOpen={showLetters}
				onClose={() => setShowLetters(false)}
				title='Thư bí mật mỗi ngày'
				icon={<Heart className='w-5 h-5 text-pink-400 fill-pink-400' />}
				maxWidth='md:max-w-lg'
			>
				<div className='flex md:grid md:grid-cols-2 gap-3 overflow-x-auto pb-2 md:overflow-x-visible snap-x snap-mandatory'>
					{loveLetters.map((_, index) => (
						<div
							key={index}
							className='flex-shrink-0 w-[75vw] md:w-full snap-center'
						>
							<LetterCard
								letterIndex={index}
								onClick={() => {
									setSelectedLetter(index);
									setShowLetters(false);
								}}
							/>
						</div>
					))}
				</div>
			</BottomSheet>

			{/* Mood Station Bottom Sheet */}
			<BottomSheet
				isOpen={showMood}
				onClose={() => setShowMood(false)}
				title='Mood Station'
				icon={<Smile className='w-5 h-5 text-cyan-400' />}
				maxWidth='md:max-w-md'
			>
				<MoodStation onClose={() => setShowMood(false)} />
			</BottomSheet>

			{/* Voucher Wallet Bottom Sheet */}
			<BottomSheet
				isOpen={showWallet}
				onClose={() => setShowWallet(false)}
				title='Voucher Wallet'
				icon={<Ticket className='w-5 h-5 text-orange-400' />}
				maxWidth='md:max-w-md'
			>
				<VoucherWallet onClose={() => setShowWallet(false)} />
			</BottomSheet>

			{/* Scratch Card Modal */}
			<BottomSheet
				isOpen={showScratchCard}
				onClose={() => setShowScratchCard(false)}
				title='🎁 Thẻ Cào May Mắn'
				maxWidth='md:max-w-sm'
			>
				<ScratchCard onComplete={() => {}} />
			</BottomSheet>

			{/* Secret Letter Modal */}
			<SecretLetter
				letterIndex={selectedLetter ?? 0}
				isOpen={selectedLetter !== null}
				onClose={() => setSelectedLetter(null)}
			/>

			{/* Games Modal */}
			<GamesModal
				isOpen={showGames}
				onClose={() => setShowGames(false)}
				onSelectGame={handleSelectGame}
			/>
		</div>
	);
}
