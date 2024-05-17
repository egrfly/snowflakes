/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 18s linear infinite",
        fall: "fall 25s linear infinite",
      },
      cursor: {
        "snowflake-edge": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height='20' width='20'%3E%3Ccircle cx='256' cy='256' r='256' fill='%230f172a' /%3E%3Ccircle cx='256' cy='256' r='192' fill='%237dd3fc' /%3E%3Ccircle cx='256' cy='256' r='96' fill='%230f172a' /%3E%3C/svg%3E%0A") 10 10, pointer`,
        "snowflake-interior": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height='20' width='20'%3E%3Ccircle cx='256' cy='256' r='256' fill='%230f172a' /%3E%3Ccircle cx='256' cy='256' r='192' fill='white' /%3E%3Ccircle cx='256' cy='256' r='96' fill='%230f172a' /%3E%3C/svg%3E%0A") 10 10, pointer`,
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-100vw)" },
          "100%": { transform: "translateY(100vw)" },
        },
      },
    },
  },
  plugins: [],
}
