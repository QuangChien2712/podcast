module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	safelist: [
		'bg-gradient-to-r',
		'from-cusDark-linerInput',
		'to-cusDarkYellow',
		'from-cusBgForm-from',
		'to-cusBgForm-to',
		'text-customOrange-superLight',
		'text-customOrange-light',
		'text-customOrange-hard',
		'bg-customOrange-superLight',
		'bg-customOrange-light',
		'bg-customOrange-hard',
		'bg-cusDark-linerInput',
		'text-cusDarkYellow',
	],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				svnCookies: ['SVN-Cookies'],
				sourceSansPro: ['Source Sans 3'],
			},
			colors: {
				customOrange: {
					superLight: '#ffdb58',
					light: '#f38c23',
					hard: '#ff924d',
				},
				cusDarkYellow: '#c58f12',
				cusDark: {
					linerInput: '#050400',
				},
				cusBgForm: {
					from: '#c1c1c1',
					to: '#f1e4c7',
				},
			},
			lineHeight: {
				'extra-loose': '2.5',
				12: '3rem',
			},
			backgroundImage: {
				TheoO1: "url('/src/assets/images/background/TheoO_Background.webp')",
				TheoO2: "url('/src/assets/images/background/TheoO2.webp')",
				TheoO3: "url('/src/assets/images/background/TheoO3.webp')",
			},
			width: {
				customSvg: '32px',
			},
			height: {
				customSvg: '32px',
			},
			transitionDuration: {
				1500: '1500ms',
				2000: '2000ms',
				3000: '3000ms',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
