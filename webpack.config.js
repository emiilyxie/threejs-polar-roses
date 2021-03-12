const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    alias: {
      'three': path.resolve(__dirname, 'node_modules/three/build/three.min.js'),
      'OrbitControls': path.resolve(__dirname, 'node_modules/three/examples/js/controls/OrbitControls.js'),
      'OBJLoader': path.resolve(__dirname, 'node_modules/three/examples/js/loaders/OBJLoader.js')
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};