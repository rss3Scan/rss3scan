module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? "none" : "source-map",
  },
  pluginOptions: {
    i18n: {},
  },
  pwa: {
    name: "RSS3Scan",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    themeColor: "#fbfbfb",
    manifestCrossorigin: "use-credentials",
  },
};
