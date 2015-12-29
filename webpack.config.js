var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        index: './src/components/index/index.js',
        yy: './src/components/yuyue/index.js',
        point: './src/components/point/index.js',
       uc: './src/components/uc/index.js',
        help: './src/components/help/index.js',
        user: './src/components/login/index.js',
        404: './src/components/404/index.js',
        pay: './src/components/pay/index.js',
        open_s: './src/components/openService/index',
        paySucc: './src/components/cb/paySucc.js',
        emailVerification: './src/components/cb/emailVerification.js',
        test: './src/components/test/test.js'
    },
    output: {
        path: path.join(__dirname, "dist/js/react"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                //include:'./src/components/',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"]
                }
            },
            {test: /\.jsx$/, loader: 'babel-loader!jsx-loader?harmony'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};