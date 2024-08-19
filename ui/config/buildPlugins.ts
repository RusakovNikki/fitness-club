import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import { BuildOptions } from './types';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import dotenv from "dotenv";

export const buildPlugins = ({
  paths,
}: BuildOptions): Configuration['plugins'] => [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.public, 'index.html'),
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new ReactRefreshWebpackPlugin(),
    new DefinePlugin({
      process: {env: JSON.stringify(process.env) ?? JSON.stringify(dotenv.config({path: `.env`}).parsed)}
    })
  ]

