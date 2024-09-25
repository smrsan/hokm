import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    dotenv.config({
        path: mode === "production" ? "./.env" : `./.env.${mode}`,
    });

    console.log("Env Vars:", {
        VITE_BASE_URL: process.env.VITE_BASE_URL,
    });

    return {
        plugins: [react()],
        base: process.env.VITE_BASE_URL,
    };
});
