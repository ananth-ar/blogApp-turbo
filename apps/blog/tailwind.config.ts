import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const daisyuiColorObj = require("daisyui/src/theming/index");

console.log(
  "daisy ui variables ",
  require("daisyui/src/theming/themes")["light"]
);

const config = {
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "black",
          secondary: "hsl(210 40% 96.1%)",
          accent: "hsl(210 40% 96.1%)",
          neutral: "hsl(0 0% 100%)",
          "base-100": "#ffff", // used in background and others
          "base-content": "#0000", // used in text and other, need to be contrast to base-100
          info: "hsl(221.2 83.2% 53.3%)",
          success: "hsl(142.1 76.2% 36.3%)",
          warning: "hsl(48 96% 53%)",
          error: "hsl(346.8 77.2% 49.8%)",
          sample: "blue",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "hsl(210 40% 98%)",
          secondary: "hsl(217.2 32.6% 17.5%)",
          accent: "0a0a0a",
          neutral: "hsl(222.2 47.4% 11.2%)",
          "base-100": "#020202",
          "base-content": "#ededed",
          info: "hsl(217.2 91.2% 59.8%)",
          success: "hsl(142.1 70.6% 45.3%)",
          warning: "hsl(47.9 95.8% 53.1%)",
          error: "hsl(346.8 77.2% 49.8%)",
          sample: "red",
        },
      },
    ],
  },

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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // extend: {
    //   colors: {
    //     border: "hsl(var(--border))",
    //     input: "hsl(var(--input))",
    //     ring: "hsl(var(--ring))",
    //     background: "hsl(var(--background))",
    //     foreground: "hsl(var(--foreground))",
    //     primary: {
    //       DEFAULT: "hsl(var(--primary))",
    //       foreground: "hsl(var(--primary-foreground))",
    //     },
    //     secondary: {
    //       DEFAULT: "hsl(var(--secondary))",
    //       foreground: "hsl(var(--secondary-foreground))",
    //     },
    //     destructive: {
    //       DEFAULT: "hsl(var(--destructive))",
    //       foreground: "hsl(var(--destructive-foreground))",
    //     },
    //     muted: {
    //       DEFAULT: "hsl(var(--muted))",
    //       foreground: "hsl(var(--muted-foreground))",
    //     },
    //     accent: {
    //       DEFAULT: "hsl(var(--accent))",
    //       foreground: "hsl(var(--accent-foreground))",
    //     },
    //     popover: {
    //       DEFAULT: "hsl(var(--popover))",
    //       foreground: "hsl(var(--popover-foreground))",
    //     },
    //     card: {
    //       DEFAULT: "hsl(var(--card))",
    //       foreground: "hsl(var(--card-foreground))",
    //     },
    //   },
    //   borderRadius: {
    //     lg: "var(--radius)",
    //     md: "calc(var(--radius) - 2px)",
    //     sm: "calc(var(--radius) - 4px)",
    //   },
    //   keyframes: {
    //     "accordion-down": {
    //       from: { height: "0" },
    //       to: { height: "var(--radix-accordion-content-height)" },
    //     },
    //     "accordion-up": {
    //       from: { height: "var(--radix-accordion-content-height)" },
    //       to: { height: "0" },
    //     },
    //   },
    //   animation: {
    //     "accordion-down": "accordion-down 0.2s ease-out",
    //     "accordion-up": "accordion-up 0.2s ease-out",
    //   },
    // },
    extend: {
      // mapping DaisyUI colors to Shadcn variables
      colors: {
        border: daisyuiColorObj["base-content"],
        input: daisyuiColorObj["base-content"],
        ring: daisyuiColorObj["base-content"],
        background: daisyuiColorObj["base-100"],
        foreground: daisyuiColorObj["base-content"],
        primary: {
          DEFAULT: daisyuiColorObj["primary"],
          foreground: daisyuiColorObj["primary-content"],
        },
        secondary: {
          DEFAULT: daisyuiColorObj["secondary"],
          foreground: daisyuiColorObj["secondary-content"],
        },
        destructive: {
          DEFAULT: daisyuiColorObj["error"],
          foreground: daisyuiColorObj["error-content"],
        },
        muted: {
          DEFAULT: daisyuiColorObj["base-300"],
          foreground: daisyuiColorObj["base-content"],
        },
        accent: {
          DEFAULT: daisyuiColorObj["accent"],
          foreground: daisyuiColorObj["accent-content"],
        },
        popover: {
          DEFAULT: daisyuiColorObj["base-100"],
          foreground: daisyuiColorObj["base-content"],
        },
        card: {
          DEFAULT: daisyuiColorObj["base-100"],
          foreground: daisyuiColorObj["base-content"],
        },
      },
      borderRadius: {
        lg: "var(--rounded-btn)",
        md: "calc(var(--rounded-btn) - 2px)",
        sm: "calc(var(--rounded-btn) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), daisyui],
} satisfies Config;

export default config;
