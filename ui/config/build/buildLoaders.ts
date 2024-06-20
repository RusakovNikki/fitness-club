import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => [
  // {
  //   test: /\.(css|scss)$/i,
  //   /**
  //    * Чтобы внедрить css в js, используется css-loader, но не даёт возможность отобразить стили на странице
  //    * Чтобы отобразить стили, используется style-loader, причём первым
  //    * Чтобы отображать scss, нужен sass-loader
  //    */
  //   use: ["style-loader", "css-loader", "sass-loader"],
  // },
  {
    test: /\.(css|scss)$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
  /**
   * Обработка typescript
   * Так же ts-loader умеет обрабатывать (j/t)sx
   */
  // {
  //   test: /\.tsx?$/,
  //   use: {
  //     loader: "ts-loader",
  //     /**
  //      * Для HMR
  //      * @see {@link https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin}
  //      */
  //     options: {
  //       getCustomTransformers: () => ({
  //         before: [ReactRefreshTypeScript()],
  //       }),
  //       transpileOnly: true,
  //     },
  //   },
  //   exclude: /node_modules/,
  // },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      /**
       * Транспиляция tsx, jsx в js
       */
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
        ],
      },
    },
  },
  /**
   * Используется чтобы была возможность
   * импортировать изображения
   */
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
        },
      },
    ],
  },
];
