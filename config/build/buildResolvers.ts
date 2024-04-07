import webpack from "webpack";
import { BuildOptions } from "./types/config";
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {

  return {
    extensions: [".tsx", ".ts", ".js"],
    preferAbsolute: true,
    modules: [options.paths.src, "node_modules"],
    mainFiles: ["index"],
    alias: {
      "@/*": [
        "./src/*"
      ]
    },
    plugins: [new TsConfigPathsPlugin()]
  };
}
