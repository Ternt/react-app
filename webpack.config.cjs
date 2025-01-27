
/* Webpack is a bundler. So, what the heck is a bundler?
 *
 * When you write JavaScript, if the file gets too big,
 * you might feel the urge to split it up into modules,
 * which your JavaScript depends on.
 *
 * This is absolutely fine. But for the browser, when it 
 * comes time to fetch the resources, it needs to make
 * individual requests for every dependency, and every 
 * dependency's dependency, and so on...
 *
 * Making many little server requests like this is fine,
 * but will do no good for your website's performance.
 * https://stackoverflow.com/questions/53690172/why-and-where-all-do-we-need-bundle-js
 *
 * This is where bundling comes in. Rather than a server 
 * serving every individual file to the browser. Webpack 
 * will crawl through your project and create a dependency 
 * graph of all* the assets in your project (JavaScript,
 * HTML, CSS, images, and so on). From there, it will 
 * generate a single bundled file. 
 *
 * Thus rather than fetching individual dependencies, the 
 * browser only needs to download one bundled file which 
 * you can then reference in your HTML.
 *
 * From a single bundled file, we can optimize even further 
 * through MINIFYING, UGLIFYING, CODE SPLITTING, and 
 * TREE SHAKING.
 *
 * Some extra reads if you are interested
 * https://8thlight.com/insights/a-history-of-javascript-modules-and-bundling-for-the-post-es6-developer
 */

const path = require("node:path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');       // Plugin to create HTML files. This is not part of bundling
                                                                // but for automating the building of your website.

module.exports= () => {
    return {
        mode: "development",                                    // Enables default optimization options. Put 'none' to opt 
                                                                // out of default optimizations.

        entry: path.resolve(__dirname, "src/index.js"),         // The first file where webpack will begin its crawl

        output: {
            path: path.resolve(__dirname, "public"),            // Path to an output directory

            filename: "bundle.js",                              // Name of the final bundled file

            publicPath: "/public",                              // The path your output directory will reference. If your site 
                                                                // have external resources (e.g. images, fonts, etc.), this 
                                                                // is the path it will reference.
        },

        // Webpack has a development server for testing your UI code. To 
        // use it, run "npm run start" or "npx webpack serve" to start the
        // server. https://webpack.js.org/configuration/dev-server/
        devServer: {                                                 
            port: "8080",               
            static: path.resolve(__dirname, "public"),
            liveReload: true
        },

        // Rules on what to do with different modules or dependencies in your file.
        // https://webpack.js.org/configuration/module/
        module:{
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use:  { 
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html')
            })
        ]
    }
}
