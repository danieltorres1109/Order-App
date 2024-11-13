import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#6C5DD3",
                primaryClair: "#f0effb",
                secondary: "#ffa2c0",
                secondaryClair: "#fff6f9",
                success: "#46bcaa",
                successClair: "#edf8f7",
                info: "#4d69fa",
                infoClair: "#edf0ff",
                warning: "#ffcf52",
                warningClair: "#fffaee",
                danger: "#f35421",
                dangerClair: "#ffe8ef",
            },
        },
    },

    plugins: [forms],
};
