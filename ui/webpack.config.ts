import { Configuration } from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { EEnvMode } from './config/build/types';
import path from 'path';

export interface EnvVariables {
  mode?: EEnvMode;
  port?: number;
}

export default (env: EnvVariables) => {
  const config: Configuration = buildWebpack({
    mode: env.mode ?? EEnvMode.DEVELOPMENT,
    port: env.port ?? 3000,
    paths: {
      output: path.resolve(__dirname, 'build'),
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
  });

  return config;
};
