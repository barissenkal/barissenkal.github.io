import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import ViteMinifyPlugin from 'vite-plugin-minify';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'unminified_index.html',
      output: {
        dir: 'dist',
      }
    },
  },
  plugins: [
    ViteMinifyPlugin({
      processScripts: ["application/ld+json"],
    }),
    {
      name: 'move-html',
      closeBundle() {
        const minifiedHtmlPath = path.resolve(__dirname, 'dist/unminified_index.html');
        const outputHtmlPath = path.resolve(__dirname, 'index.html');

        // Move the file to the root directory
        fs.renameSync(minifiedHtmlPath, outputHtmlPath);

        // Remove the dist directory
        fs.rmdirSync(path.resolve(__dirname, 'dist'), { recursive: true });
      }
    }
  ]
});
