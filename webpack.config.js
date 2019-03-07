const path = require("path");


module.exports = {
  entry: {
    main: "./public/js/app/controller.js",
  },
  output: {
    path: path.resolve(__dirname, "public/js/bundles"),
    filename: "[name].bundle.js"
  },
  mode: "development"
};