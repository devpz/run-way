import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async () => {
  const postcssConfig = await import("./postcss.config.ts");

  return {
    plugins: [react(), tsconfigPaths()],
    css: {
      postcss: postcssConfig.default,
    },
  };
});
