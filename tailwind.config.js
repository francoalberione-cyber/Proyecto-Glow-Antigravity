/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'glow-purple': '#330066',
                'glow-orange': '#FF6600',
            },
        },
    },
    plugins: [],
}
