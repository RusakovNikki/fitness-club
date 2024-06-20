import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => ({
  //   static: {
  //     directory: "./dist",
  //   },
  port: options.port ?? 3000,
  open: true,
  /**
   * Чтобы поддерживался роутинг в React Router Dom.
   * Работает только для devServer.
   * Если раздавать статику через nginx то нужно делать проксирование на index.html
   */
  historyApiFallback: true,
  /**
   * Позволяет обновлять контент без перезагрузки страницы.
   * Но так как мы используем не чистый js, а React, то нужно подключить
   * Библиотеки:
   * @see {@link https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin
   */
  hot: true,
});
