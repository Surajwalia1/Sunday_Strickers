import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        // Football theme colors
        football: {
          blue: {
            50: "hsl(213, 100%, 96%)",
            100: "hsl(214, 95%, 93%)",
            200: "hsl(213, 97%, 87%)",
            300: "hsl(212, 96%, 78%)",
            400: "hsl(213, 94%, 68%)",
            500: "hsl(217, 91%, 60%)",
            600: "hsl(221, 83%, 53%)",
            700: "hsl(224, 76%, 48%)",
            800: "hsl(226, 71%, 40%)",
            900: "hsl(224, 64%, 33%)",
            950: "hsl(226, 55%, 21%)",
          },
          orange: {
            50: "hsl(33, 100%, 96%)",
            100: "hsl(34, 100%, 92%)",
            200: "hsl(32, 98%, 83%)",
            300: "hsl(31, 97%, 72%)",
            400: "hsl(27, 96%, 61%)",
            500: "hsl(25, 95%, 53%)",
            600: "hsl(21, 90%, 48%)",
            700: "hsl(17, 88%, 40%)",
            800: "hsl(15, 79%, 34%)",
            900: "hsl(15, 75%, 28%)",
            950: "hsl(15, 81%, 17%)",
          },
          maroon: {
            50: "hsl(0, 86%, 97%)",
            100: "hsl(356, 75%, 94%)",
            200: "hsl(358, 75%, 89%)",
            300: "hsl(357, 74%, 81%)",
            400: "hsl(356, 69%, 68%)",
            500: "hsl(356, 61%, 56%)",
            600: "hsl(354, 70%, 47%)",
            700: "hsl(353, 74%, 39%)",
            800: "hsl(350, 69%, 32%)",
            900: "hsl(348, 65%, 28%)",
            950: "hsl(349, 69%, 14%)",
          },
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
