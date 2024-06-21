import webpack, { Configuration } from "webpack";
import { buildWebpack } from "./config/buildWebpack";
import { EEnvMode } from "./config/types";
import path from "path";

export interface EnvVariables {
  mode?: EEnvMode;
  port?: number;
}

export default (env: EnvVariables) => {
  const config: Configuration = buildWebpack({
    mode: env.mode ?? EEnvMode.DEVELOPMENT,
    port: env.port ?? 3000,
    paths: {
      output: path.resolve(__dirname, "build"),
      entry: path.resolve(__dirname, "src", "index.tsx"),
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
      config: path.resolve(__dirname, "config"),
    },
  });

  return config;
};
