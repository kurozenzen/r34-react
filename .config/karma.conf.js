module.exports = function (config) {
  config.set({
    basePath: "../",
    browsers: ["Chrome"],
    files: [{ pattern: "test/*", watched: false }],
    frameworks: ["jasmine"],
    preprocessors: {
      "test/*": ["webpack"],
    },
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                },
              },
            ],
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  })
}
