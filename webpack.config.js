const path = require("path");

module.exports = {
  entry: [
    "./js/server.js",
    "./js/timeout.js",
    "./js/huge-img.js",
    "./js/card-create.js",
    "./js/filters.js",
    "./js/validation.js",
    "./js/submit.js",
    "./js/modal-open-close.js",
    "./js/photo-loading.js",
    "./js/luck.js",
    "./js/mistake.js",
    "./js/special-view.js",
    "./js/scale.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    iife: true
  },
  devtool: false
};
