import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function buildLoaders(options) {
  const idDev = options.mode === "development";
  const { paths } = options;

  const jsxLoader = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  };
  const scssLoader = {
    test: /\.s?css$/,
    exclude: /\.module\.s?css$/,
    use: [
      idDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
      {
        loader: "sass-resources-loader",
        options: {
          resources: [paths.styleMixins],
        },
      },
    ],
  };
  const scssModuleLoader = {
    test: /\.module\.s?css$/,
    use: [
      idDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            namedExport: false,
            localIdentName: "[name]__[local]___[hash:base64:5]",
            exportLocalsConvention: "camelCase",
          },
          sourceMap: idDev,
        },
      },
      "sass-loader",
      {
        loader: "sass-resources-loader",
        options: {
          resources: [paths.styleMixins],
        },
      },
    ],
  };
  const expansionLoader = {
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  };
  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    type: "asset/resource",
    generator: {
      filename: "fonts/[name][hash][ext][query]",
    },
  };
  const imgLoader = {
    test: /\.(jpeg|jpg|png|webp)$/,
    type: "asset/resource",
    generator: {
      filename: "img/[name][hash][ext][query]",
    },
  };
  const jsonLoader = {
    test: /\.json$/,
    loader: "json-loader",
    type: "javascript/auto",
  };

  return [jsxLoader, scssLoader, scssModuleLoader, expansionLoader, fontsLoader, imgLoader, jsonLoader];
}
