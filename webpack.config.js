import path from "path";
import { fileURLToPath } from "url";
import buildWebpack from "./config/build/buildWebpack.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const paths = {
    entry: path.resolve(__dirname, "src", "index.jsx"),
    output: path.resolve(__dirname, env.mode === "development" ? "build" : "docs"),
    html: path.resolve(__dirname, "public", "index.html"),
    imgFrom: path.resolve(__dirname, "src", "assets", "images"),
    imgTo: path.resolve(__dirname, env.mode === "development" ? "build" : "docs", "img"),
    devServer: path.resolve(__dirname, "build"),
    styleMixins: path.resolve(__dirname, "src", "assets", "styles", "_mixin.scss"),
    fonts: path.resolve(__dirname, "src", "assets", "fonts"),
  };
  const config = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
  });

  return config;
};
