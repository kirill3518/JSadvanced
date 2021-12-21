const path = require('path');

// __dirname

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    }
};

module.exports = config;