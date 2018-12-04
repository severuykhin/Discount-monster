const path = require('path');
const webpack = require('webpack');

const config = {
    entry  : path.resolve(__dirname, './reactmodules/index.js'),
    mode   : 'development',
    output : {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../public')
    },

    module: {

      rules: [
        {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react'],
            "plugins": [
              "transform-object-rest-spread",
              "transform-class-properties"
            ]
          }
        }
      ]
    }
};

module.exports = config;