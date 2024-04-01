/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./index.html"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				Poppins: ["Poppins", "sans-serif"],
			},

			colors: {
				"zinc-1000": "#1c1c1c",
				"zinc-1100": "#121212",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},

				"animate-delete-row": {
					"0%": {
						display: "table-row",
						opacity: 1,
						height: 66,
					},
					"80%": {
						display: "table-row",
						opacity: 0,
						height: 66,
					},
					"90%": {
						display: "flex",
						opacity: 0,
						height: 0,
					},
					"100%": {
						height: 0,
						opacity: 0,
						display: "none",
					},
				},
				"animate-created-row": {
					"0%": {
						display: "flex",
						opacity: 0,
						height: 0,
					},
					"30%": {
						display: "flex",
						opacity: 0,
						height: 66,
					},
					"50%": {
						display: "table-row",
						opacity: 0,
						height: 66,
					},
					"100%": {
						display: "table-row",
						opacity: 1,
						height: 66,
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"delete-row": "animate-delete-row 300ms ease-out forwards",
				"created-row": "animate-created-row 300ms ease-in forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
