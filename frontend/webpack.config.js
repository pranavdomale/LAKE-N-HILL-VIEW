const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      crypto: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider'),
    }),
  ],
};
