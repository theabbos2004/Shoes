import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			primary_1: 'var(--primary_1)',
  			gray_1: 'var(--gray_1)',
  			gray_2: 'var(--gray_2)',
  			gray_4: 'var(--gray_4)',
  			gray_5: 'var(--gray_5)',
  			gray_3: 'var(--gray_3)',
  			orange_1: 'var(--orange_1)',
  			red_1: 'var(--red_1)',
  			red_2: 'var(--red_2)',
  			brown_1: 'var(--brown_1)',
  			brown_2: 'var(--brown_2)',
  			green_1: 'var(--green_1)',
  			green_2: 'var(--green_2)'
  		},
  		container: {
  			padding: {
  				DEFAULT: '1rem'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
} satisfies Config;
