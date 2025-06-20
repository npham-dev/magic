import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { glob } from "glob";
import path from "path";
import preserveDirectives from "rollup-preserve-directives";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const EXCLUDE = [
  "node_modules/**",
  "src/**/*.fixture.tsx",
  "src/fixture/**/*",
  "./src/wrapper.tsx",
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      include: ["src/**"],
      exclude: EXCLUDE,
      tsconfigPath: "./tsconfig.app.json",
    }),
    tailwindcss(),
    react(),
    preserveDirectives(),
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
        // peer dependency
        "react",
        "react/jsx-runtime",
        "react-dom",
        "natmfat",

        // for demos
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
              "src/lib/**/!(*.d).{ts,tsx}",
            ],
            { ignore: EXCLUDE },
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
