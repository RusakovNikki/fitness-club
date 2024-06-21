import { Configuration } from 'webpack';
import 'webpack-dev-server';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions, EEnvMode } from './types';

export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths, port } = options;
  return {
    mode: mode ?? EEnvMode.DEVELOPMENT,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true,
    },
    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    devtool: 'source-map',

    devServer: buildDevServer(options),
  };
}
