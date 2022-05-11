module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "pinterest-prefix": "repeat(auto-fill, 1fr)",
        "pinterest-prefix-md": "repeat(auto-fill, 350px)"
      },
    },
  },
  plugins: [],
};
