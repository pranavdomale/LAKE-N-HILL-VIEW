const webpack = require('webpack');

module: {
  rules: [
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    }
  ]
}

module.exports = {
  resolve: {
    fallback: {
      crypto: false,
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider'),
    }),
  ],
};