import { Configuration } from "webpack";
import { BuildOptions } from "./types";

export const buildResolvers = (
  options: BuildOptions
): Configuration["resolve"] => ({
  extensions: [".tsx", ".ts", ".js"],
  alias: {
    "@": options.paths.src,
  },
});
