export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   optimizeDeps: {
    include: ['react-player'],
  },
  theme: {
  	extend: {
  		colors: {
  			primary: 'rgb(var(--primary-color) / <alpha-value>)',
  			secondary: 'rgb(var(--secondary-color) / <alpha-value>)',
  			third: 'rgb(var(--third-color) / <alpha-value>)',
  			textPrimary: 'rgb(var(--text-primary-color) / <alpha-value>)',
  			textSecondary: 'rgb(var(--text-secondary-color) / <alpha-value>)',
  			textThird: 'rgb(var(--text-third-color) / <alpha-value>)',
  			whiteCustom: 'rgb(var(--white-color) / <alpha-value>)',
  			blackCustom: 'rgb(var(--black-color) / <alpha-value>)'
  		},
  		fontFamily: {
  			classic: [
  				'Merriweather',
  				'serif'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

