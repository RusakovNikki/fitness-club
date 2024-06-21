import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from "webpack";
import { BuildOptions } from "./types";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";

export const buildPlugins = ({
  paths,
}: BuildOptions): Configuration["plugins"] => [
  /**
   * Используем эту библиотеку, если хотим, чтобы в сборке css был отдельным файлом.
   * При этом все файлы (css, scss) конвертируются в один.
   */
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[name].[contenthash].css",
  }),
  /**
   * Добавляем этот плагин чтобы файл index.html автоматически шёл в сборку
   * и при этом подключал автоматом скрипт
   */
  new HtmlWebpackPlugin({
    template: path.resolve(paths.public, "index.html"),
    favicon: path.resolve(paths.public, "favicon.ico"),
  }),
  /**
   * Для HMR
   * @see {@link https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin}
   */
  new ReactRefreshWebpackPlugin(),
];
