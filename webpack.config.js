const path = require('path')

const publicFolder = path.join(__dirname, 'public');

module.exports = (env) => { 
  const isProduction = env === 'production';
  return {
    entry: './src/app.js',
    output: {
      path: publicFolder,
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: publicFolder,
      historyApiFallback: true
    }
  };
}