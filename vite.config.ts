import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

export default {
  plugins: [react(), vike({ prerender: true })],
} as UserConfig;