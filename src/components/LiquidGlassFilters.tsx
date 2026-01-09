/**
 * SVG Filters for Liquid Glass refraction effects
 * Include this component once in App.tsx
 */
const LiquidGlassFilters = () => {
	return (
		<svg className='liquid-filters' aria-hidden='true'>
			<defs>
				{/* Subtle refraction/distortion filter */}
				<filter
					id='liquid-refraction'
					x='-20%'
					y='-20%'
					width='140%'
					height='140%'
				>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.015'
						numOctaves='3'
						result='noise'
					/>
					<feDisplacementMap
						in='SourceGraphic'
						in2='noise'
						scale='8'
						xChannelSelector='R'
						yChannelSelector='G'
					/>
				</filter>

				{/* Magnify/lens effect for hover */}
				<filter id='magnify-lens' x='-10%' y='-10%' width='120%' height='120%'>
					<feTurbulence
						type='fractalNoise'
						baseFrequency='0.02'
						numOctaves='2'
						result='noise'
					/>
					<feDisplacementMap
						in='SourceGraphic'
						in2='noise'
						scale='4'
						xChannelSelector='R'
						yChannelSelector='G'
					/>
				</filter>

				{/* Glow filter */}
				<filter id='liquid-glow' x='-50%' y='-50%' width='200%' height='200%'>
					<feGaussianBlur in='SourceAlpha' stdDeviation='8' result='blur' />
					<feFlood floodColor='#fbbf24' floodOpacity='0.4' result='color' />
					<feComposite in='color' in2='blur' operator='in' result='glow' />
					<feMerge>
						<feMergeNode in='glow' />
						<feMergeNode in='SourceGraphic' />
					</feMerge>
				</filter>
			</defs>
		</svg>
	);
};

export default LiquidGlassFilters;
