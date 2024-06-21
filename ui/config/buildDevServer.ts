import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

export const buildDevServer = (
  options: BuildOptions,
): DevServerConfiguration => ({
  port: options.port ?? 3000,
  open: true,
  historyApiFallback: true,
  hot: true,
});
