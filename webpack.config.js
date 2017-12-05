const path = require('path');


module.exports = {
  // context: __dirname,
  entry: "./lib/guitar_hero.js",
  // target: 'node',
  output: {
    // path: path.resolve(__dirname, 'lib'),
  	filename: "./lib/bundle.js"
  },
  // resolve: {
  //   extensions: ['.js']
  // },
  devtool: 'source-map',
};
