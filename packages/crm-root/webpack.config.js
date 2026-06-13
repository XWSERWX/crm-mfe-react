const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    static: path.join(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'root',
      remotes: {
        auth: `auth@${process.env.AUTH_URL || 'http://localhost:3001'}/remoteEntry.js`,
        clients: `clients@${process.env.CLIENTS_URL || 'http://localhost:3002'}/remoteEntry.js`,
        deals: `deals@${process.env.DEALS_URL || 'http://localhost:3003'}/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.0',
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
