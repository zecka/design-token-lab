import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Consumed by Storybook's @storybook/react-vite builder (it injects the
// React plugin itself, so only Tailwind is configured here).
export default defineConfig({
  plugins: [tailwindcss()],
});
