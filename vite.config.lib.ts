import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { glob } from "glob";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { optimizeCssModules } from "vite-plugin-optimize-css-modules";

const EXCLUDE_FIXTURES = ["src/**/*.fixture.tsx", "src/fixture/**/*"];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    libInjectCss(),
    optimizeCssModules(),
    dts({
      include: ["src"],
      exclude: ["node_modules/**", ...EXCLUDE_FIXTURES],
    }),
    react(),
  ],
  build: {
    minify: "esbuild",
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "namtfat",
        "@conform-to/react",
        "@conform-to/zod",
        "zod",
      ],
      input: Object.fromEntries(
        glob
          .sync(
            [
              "src/index.ts",
              "src/components/**/!(*.d).{ts,tsx}",
              "src/hooks/**/!(*.d).{ts,tsx}",
              "src/types.ts",
            ],
            { ignore: EXCLUDE_FIXTURES },
          )
          .map((file) => [
            path.relative(
              "src",
              file.substring(0, file.length - path.extname(file).length),
            ),
            path.resolve(__dirname, file),
          ]),
      ),
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
    copyPublicDir: false,
  },
});
