// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/LCPE/',
//   build: {
//     outDir: path.join(__dirname, "..", "public"),
//     emptyOutDir: true,
//   },
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://0.0.0.0:3000",
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//       },
//     },
//   },
//   serve: {
//     static: ["./src"],
//     mimeTypes: {
//       "text/jsx": "application/javascript",
//     },
//   },
// });
