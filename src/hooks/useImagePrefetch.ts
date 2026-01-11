import { useEffect } from 'react';
import {
	memoryCapsules,
	moodData,
	funnyMoments,
	quizData,
} from '../data/easterEggs';

export function useImagePrefetch() {
	useEffect(() => {
		const collectImages = () => {
			const images = new Set<string>();

			// 1. Memory Capsules
			memoryCapsules.forEach((cap) => {
				cap.images.forEach((img) => images.add(img));
			});

			// 2. Mood Data
			moodData.forEach((checkin) => {
				checkin.options.forEach((opt) => {
					opt.response.images.forEach((img) => images.add(img));
				});
			});

			// 3. Funny Moments
			funnyMoments.forEach((moment) => {
				images.add(moment.image);
			});

			// 4. Quiz Data
			quizData.forEach((quiz) => {
				if (quiz.image) images.add(quiz.image);
			});

			return Array.from(images);
		};

		const preloadImage = (src: string) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = resolve;
				img.onerror = reject;
			});
		};

		const runPrefetch = async () => {
			const allImages = collectImages();
			// console.log(`[Prefetch] Starting prefetch for ${allImages.length} images...`);

			// Process in small batches to avoid network congestion
			const BATCH_SIZE = 3;
			for (let i = 0; i < allImages.length; i += BATCH_SIZE) {
				const batch = allImages.slice(i, i + BATCH_SIZE);
				await Promise.allSettled(batch.map((src) => preloadImage(src)));
				// Optional: Add small delay between batches if needed
				// await new Promise(r => setTimeout(r, 100));
			}

			// console.log('[Prefetch] Completed.');
		};

		// Run after a short delay to allow initial page load to finish
		const timer = setTimeout(() => {
			runPrefetch();
		}, 2000);

		return () => clearTimeout(timer);
	}, []);
}
