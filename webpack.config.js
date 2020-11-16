const path = require('path')
const VueLoader = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}) => ({
    entry: path.join(__dirname, './src/main.ts'),
    mode: env.prod ? 'production' : 'development',
    devtool: env.prod ? 'source-map' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true /* 跳过typescript类型检查 加快打包速度 */}
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]'
                        }
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.ejs$/i,
                use: 'raw-loader',
            },    
            // sass config
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            {
                test: /\.wasm$/,
                type: 'javascript/auto',
                loader: 'arraybuffer-loader',
            }                         
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, 'src')
        }   
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        inline: true,
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9988,
        proxy: {
            '/rpc': 'http://localhost:7010'
        }
    },
    plugins: [
        new VueLoader.VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'false'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', 
            template: path.join(__dirname, 'index.html'), //本地自定义模板
            inject: true
       })        
    ],
    externals: {
        '@salaku/js-sdk': 'tdsSDK',
        vue: 'Vue'
    },
    watchOptions: {
        ignored: /node_modules/
    }
})
