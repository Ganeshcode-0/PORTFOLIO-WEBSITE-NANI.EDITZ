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
        sky: {
          blue: "#63D0F2",
        },
        light: {
          cyan: "#85E4FF",
        },
        bright: {
          blue: "#168BFF",
        },
        electric: {
          blue: "#0757E8",
        },
        deep: {
          blue: "#052B69",
        },
        dark: {
          navy: "#031326",
        },
        almost: {
          black: "#02070D",
        },
        white: {
          pure: "#F5FAFF",
        },
        muted: {
          bluegray: "#A8C2DA",
        },
        glass: {
          border: "rgba(133, 228, 255, 0.45)",
          surface: "rgba(30, 117, 205, 0.16)",
          surfaceHover: "rgba(30, 117, 205, 0.28)",
          card: "rgba(5, 43, 105, 0.4)",
        },
      },
      boxShadow: {
        'glass-glow': '0 0 25px rgba(99, 208, 242, 0.28), inset 0 1px 2px rgba(133, 228, 255, 0.4)',
        'glass-deep': '0 20px 50px rgba(2, 7, 13, 0.7), inset 0 1px 1px rgba(133, 228, 255, 0.3)',
        'cyan-neon': '0 0 15px rgba(133, 228, 255, 0.5), 0 0 30px rgba(22, 139, 255, 0.3)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        'organic': '38px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
