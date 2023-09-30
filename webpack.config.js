const path = require('path');

module.exports = {
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
};

// {
//     output: {
//       path: './build',
//       publicPath: '/',
//     },
//     plugins: [
//       new CopyWebpackPlugin([
//         {
//           from: './node_modules',
//           to: './build/node_modules',
//         },
//       ]),
//     ],
//   }