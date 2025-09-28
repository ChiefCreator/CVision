import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["storage.yandexcloud.net", "lh3.googleusercontent.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  webpack(config) {
    const oneOfRule = config.module?.rules.find((rule: any) => Array.isArray(rule.oneOf));

    if (oneOfRule) {
      oneOfRule.oneOf.forEach((rule: any) => {
        if (!rule.use) return;

        const loaders = Array.isArray(rule.use) ? rule.use : [rule.use];

        loaders.forEach((loader: any) => {
          if (typeof loader.loader !== "string") return;

          if (
            loader.loader.includes("sass-loader") ||
            loader.loader.includes("resolve-url-loader") ||
            loader.loader.includes("postcss-loader") ||
            loader.loader.includes("css-loader")
          ) {
            loader.options = { ...(loader.options || {}), sourceMap: true };
          }

          if (loader.loader.includes("css-loader") && loader.options?.modules) {
            loader.options.modules.exportLocalsConvention = "camelCase";
          }

          if (loader.loader.includes("sass-loader") && !loader.options?.additionalData) {
            loader.options.additionalData = `@use "@/assets/styles/mixin" as *;`;
            loader.options.sassOptions = {
              ...(loader.options.sassOptions || {}),
              includePaths: [path.resolve(__dirname, "src")],
            };
          }
        });
      });
    }

    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },
};

export default nextConfig;
