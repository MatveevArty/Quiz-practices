const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

// Стандартный экспорт модулей из документации "guides/getting-started modules"
module.exports = {
    entry: './src/app.js',
    mode: 'development', // Режим на девелопмент по рекомендации из терминала
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true // Зачистка папки dist при каждой пересборке
    },

    // Запуск сервера посредством вебпак
    devServer: {
        static: '.dist',
        compress: true,
        port: 9000,
    },

    // Плагины для 1) index html, 2) всех темплейтов, стилей, шрифтов и картинок
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),

        new CopyPlugin({
            patterns: [
                {from: "templates", to: "templates"},
                {from: "styles", to: "styles"},
                {from: "static/fonts", to: "fonts"},
                {from: "static/images", to: "images"}
            ],
        })
    ],

    // Транспиляция js посредством бабель-модуля
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     targets: "defaults",
    //                     presets: [
    //                         ['@babel/preset-env']
    //                     ]
    //                 }
    //             }
    //         }
    //     ]
    // }
};