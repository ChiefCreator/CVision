import type { NextConfig } from 'next';
import path from 'path';

import { getCssModuleLocalIdent } from "next/dist/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent";


const SRC_PATH = path.resolve(__dirname, "src");

const GLOBAL_SCSS_IMPORTS = `
  @use "@/assets/styles/mixin" as *;
  @use "@/assets/styles/breakpoints" as *;
`;

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["storage.yandexcloud.net", "lh3.googleusercontent.com"],
  },
  webpack(config, { dev, isServer }) {
    config.resolve.alias.canvas = false; 
    config.resolve.alias['@'] = path.resolve(__dirname, "src");

    const oneOfRule = config.module?.rules.find((rule: any) => Array.isArray(rule.oneOf))?.oneOf;

    if (!oneOfRule) return config;

    oneOfRule.forEach((rule: any) => {
      if (!rule.use) return;

      const loaders = Array.isArray(rule.use) ? rule.use : [rule.use];

      loaders.forEach(patchRuleLoaderOptions);
    });

    oneOfRule.unshift({
      test: /\.module\.scss$/,
      resourceQuery: /inline/,
      use: [
        { loader: "to-string-loader" },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: false,
            modules: {
              getLocalIdent: (context: any, _: any, exportName: any, options: any) => {
                return getCssModuleLocalIdent(
                  {
                    ...context,
                    rootContext: context.rootContext || context.context,
                    resourcePath: context.resourcePath,
                  },
                  _,
                  exportName,
                  {
                    ...options,
                    mode: dev ? "development" : "production",
                    isServer,
                  }
                );
              },
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: false,
            sassOptions: {
              includePaths: [SRC_PATH],
            },
            additionalData: GLOBAL_SCSS_IMPORTS,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;

const patchRuleLoaderOptions = (loader: any) => {
  if (typeof loader.loader !== "string") return;

  const cssLikeLoaders = ["sass-loader", "resolve-url-loader", "postcss-loader", "css-loader"];
  if (cssLikeLoaders.some(name => loader.loader.includes(name))) {
    loader.options = { ...(loader.options || {}), sourceMap: true };
  }

  if (loader.loader.includes("css-loader") && loader.options?.modules) {
    loader.options.modules.exportLocalsConvention = "camelCase";
  }

  if (loader.loader.includes("sass-loader")) {
    loader.options = {
      ...(loader.options || {}),
      additionalData: loader.options?.additionalData ?? GLOBAL_SCSS_IMPORTS,
      sassOptions: {
        ...(loader.options?.sassOptions || {}),
        includePaths: [SRC_PATH],
      },
    };
  }
};
