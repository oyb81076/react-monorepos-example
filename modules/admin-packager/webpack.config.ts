// tslint:disable:no-var-requires
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import ManifestPlugin from 'webpack-manifest-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path'
import * as webpack from 'webpack'
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const __DEV__ = process.env.NODE_ENV === 'development'
const __PRO__ = process.env.NODE_ENV === 'production'
const PUBLIC_URL = process.env.PUBLIC_URL || ""

const HOST = process.env.HOST || "0.0.0.0"
const PORT = parseInt(process.env.PORT || "0", 10) || 3000
const HTTPS = process.env.HTTPS === 'true'
const { localUrlForBrowser, lanUrlForConfig } = prepareUrls(HTTPS, HOST, PORT)
const config: webpack.Configuration = {
  devtool: __PRO__ ? "source-map" : "cheap-module-source-map",
  mode: __DEV__ ? "development" : "production",
  entry: [
    __DEV__ ? require.resolve('react-dev-utils/webpackHotDevClient') : "",
    path.join(__dirname, "./src/index.ts"),
  ].filter(Boolean),
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    path: path.join(__dirname, "build"),
    publicPath: `${PUBLIC_URL}/`,
    devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) => absoluteResourcePath,
  },
  devServer: {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.join(__dirname, "./public"),
    watchContentBase: true,
    hot: true,
    publicPath: `${PUBLIC_URL}/`,
    watchOptions: {
      ignored: [
        path.join(__dirname, "node_modules"),
        path.join(__dirname, "../../node_modules"),
      ],
    },
    https: HTTPS,
    host: HOST,
    port: PORT,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    public: lanUrlForConfig,
    before(app) {
      app.use(errorOverlayMiddleware())
      app.use(noopServiceWorkerMiddleware())
    },
    after() { openBrowser(localUrlForBrowser) },
  },
  resolve: {
    alias: {
      "@react": path.join(__dirname, "../../components"),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: { limit: 10000, name: 'static/images/[name].[hash:8].[ext]' },
      },
      {
        test: /\.css$/,
        use: [
          __PRO__ ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
        ],
      },
      {
        test: /\.tsx?$/,
        include: [
          path.join(__dirname, "./src"),
          path.join(__dirname, "../../components"),
        ],
        use: [
          { loader: require.resolve('babel-loader') },
          { loader: require.resolve('ts-loader'), options: { transpileOnly: true } },
        ],
      },
      {
        include: /\.(svg|woff|woff2|otf|ttf|eot)$/,
        loader: require.resolve('file-loader'),
        options: { name: 'static/fonts/[name].[hash:8].[ext]' },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: !__DEV__ ? undefined : [
        path.join(__dirname, "./src"),
        path.join(__dirname, "../../components"),
      ],
      tsconfig: path.join(__dirname, "../../components/tsconfig.json"),
      tslint: path.join(__dirname, "../../components/tslint.json"),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_URL: JSON.stringify(PUBLIC_URL),
      },
      '__PRO__': __PRO__,
      '__DEV__': __DEV__,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "./public/index.html"),
      PUBLIC_URL,
    }),
    ...!__DEV__ ? [] : [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
    ],
    ...!__PRO__ ? [] : [
      new ManifestPlugin({ fileName: "manifest-assets.json" }),
      new SWPrecacheWebpackPlugin({
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: __PRO__,
        navigateFallback: PUBLIC_URL + '/index.html',
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }),
      new MiniCssExtractPlugin({
        filename: `static/css/bundle.[contenthash:8].css`,
      }),
    ],
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    bson: "empty",
  },
  performance: {
    hints: __DEV__ ? false : "warning",
  },
};
export = config
