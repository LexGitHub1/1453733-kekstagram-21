const path = require("path");

module.exports = {
  entry: [
    "./js/server.js",
    "./js/timeout.js",
    "./js/big-picture.js",
    "./js/picture.js",
    "./js/filters.js",
    "./js/validation.js",
    "./js/submit.js",
    "./js/form.js",
    "./js/photo-loading.js",
    "./js/success.js",
    "./js/error.js",
    "./js/effects-img.js",
    "./js/scale.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
