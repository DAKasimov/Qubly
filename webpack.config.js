import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: './index.js',

    output: {
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: isProd
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            }
          : false,
      }),
      new CopyPlugin({
        patterns: [
          { from: 'css', to: 'css', noErrorOnMissing: true },
          { from: 'js', to: 'js', noErrorOnMissing: true },
          { from: 'libs', to: 'libs', noErrorOnMissing: true },
          { from: 'img', to: 'img', noErrorOnMissing: true },
          { from: 'fonts', to: 'fonts', noErrorOnMissing: true },
        ],
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: 'styles.[contenthash].css',
            }),
            new CompressionPlugin({
              algorithm: 'gzip',
              test: /\.(js|css|html|svg)$/,
              threshold: 8192,
            }),
          ]
        : []),
    ],

    optimization: isProd
      ? {
          minimize: true,
          minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
          splitChunks: {
            chunks: 'all',
          },
        }
      : undefined,

    devServer: {
      static: './dist',
      port: 3000,
      open: true,
      hot: true,
    },

    devtool: isProd ? false : 'eval-source-map',
  };
};
