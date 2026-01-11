import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import fs from 'fs';
import { componentTagger } from 'lovable-tagger';
import { VitePWA } from 'vite-plugin-pwa';

// Custom plugin to inject prefetch links
const injectEasterEggPrefetch = () => {
	return {
		name: 'inject-easter-egg-prefetch',
		transformIndexHtml(html: string) {
			try {
				const imagesDir = path.resolve(__dirname, 'public/images/easter-eggs');
				if (!fs.existsSync(imagesDir)) return html;

				const files = fs.readdirSync(imagesDir);
				const imageFiles = files.filter((file) =>
					/\.(png|jpe?g|gif|svg)$/i.test(file)
				);

				const links = imageFiles
					.map(
						(file) =>
							`<link rel="prefetch" href="/images/easter-eggs/${file}" as="image" />`
					)
					.join('\n\t\t');

				return html.replace('</head>', `\t${links}\n</head>`);
			} catch (error) {
				console.error('Error injecting prefetch links:', error);
				return html;
			}
		},
	};
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	server: {
		host: '::',
		port: 8080,
	},
	plugins: [
		react(),
		mode === 'development' && componentTagger(),
		injectEasterEggPrefetch(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			manifest: {
				name: 'Sapa Yêu Thương - Hành Trình Của Đôi Mình',
				short_name: 'Sapa ❤️',
				description: 'Lịch trình du lịch Sapa lãng mạn cho hai đứa mình',
				theme_color: '#1a1a2e',
				background_color: '#0f0f23',
				display: 'standalone',
				orientation: 'portrait',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: '/icons/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				runtimeCaching: [
					{
						urlPattern: /\/images\/easter-eggs\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'easter-egg-images',
							expiration: {
								maxEntries: 200,
								maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
		}),
	].filter(Boolean),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
}));
