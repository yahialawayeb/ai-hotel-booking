
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#C5A059', // var(--primary)
                    dark: '#B08D45', // var(--primary-dark)
                    light: '#E6C88A', // approx for hover
                },
                secondary: {
                    DEFAULT: '#1A1A1A', // var(--secondary)
                    light: '#333333', // var(--secondary-light)
                },
                surface: '#FFFFFF',
                background: '#FAFAFA',
                text: {
                    main: '#333333',
                    light: '#F5F5F5',
                    muted: '#666666',
                },
                border: '#E0E0E0',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-playfair)', 'serif'],
            },
            boxShadow: {
                'premium': '0 4px 20px rgba(0, 0, 0, 0.08)', // var(--shadow)
            }
        },
    },
    plugins: [],
};
export default config;
