import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: "/xxxxxxxxx/", // 子路径
  plugins: [
    vue(),
    legacy({
      targets: ["> 1%", "last 2 versions", "not ie <= 8"]
    })
  ],
});
