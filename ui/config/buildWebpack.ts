import { Configuration } from "webpack";
import "webpack-dev-server";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions, EEnvMode } from "./types";

export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths, port } = options;
  return {
    mode: mode ?? EEnvMode.DEVELOPMENT,
    /**
     * Откуда брать код
     */
    entry: paths.entry,
    /**
     * Куда записать билд. При этом если название будет статичным,
     * то браузер его может кешировать.
     * Поэтому нужно использовать шаблоны
     */
    output: {
      filename: "[name].[contenthash].js",
      path: paths.output,
      // перед сборкой очищает папку
      clean: true,
    },
    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },
    /**
     * Чтобы можно было писать import { AGE } from "./simpleFile"; без ".ts(x)"
     */
    resolve: buildResolvers(options),
    /**
     * Теперь при просмотре в логах кода можно посмотреть файл в обычном виде, а не в транспилированном.
     * Это происходит  благодаря файлу *.map
     */
    devtool: "source-map",

    devServer: buildDevServer(options),
  };
}
