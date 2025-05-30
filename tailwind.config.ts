import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				parchment: '#f5f1e8',
				leather: '#8B4513',
				bookSpine: '#8B575C',
				goldLeaf: '#D4AF37',
				inkBlue: '#14213d',
				cafeAuLait: '#A67B5B',
				oldPaper: '#E8DCCA',
			},
			fontFamily: {
				serif: ['Playfair Display', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['Courier New', 'monospace'],
				handwritten: ['"Caveat"', 'cursive'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'neo': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
				'book': '0 15px 25px rgba(0, 0, 0, 0.06)',
				'bookCover': '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
				'bookSpine': '1px 0 3px rgba(0, 0, 0, 0.3), inset -1px 0 2px rgba(255, 255, 255, 0.5)',
				'page': '0 1px 1px rgba(0, 0, 0, 0.1)',
				'bookStack': '0 15px 30px -10px rgba(0, 0, 0, 0.4)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-left': {
					'0%': { transform: 'translateX(10px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'slide-right': {
					'0%': { transform: 'translateX(-10px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' },
				},
				'book-tilt': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(2deg)' },
				},
				'page-turn': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(-180deg)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-down': 'slide-down 0.4s ease-out',
				'slide-left': 'slide-left 0.4s ease-out',
				'slide-right': 'slide-right 0.4s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'scale-out': 'scale-out 0.4s ease-out',
				'book-tilt': 'book-tilt 2s ease-in-out infinite',
				'page-turn': 'page-turn 0.6s ease-in-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
