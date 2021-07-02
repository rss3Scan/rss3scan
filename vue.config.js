module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? "none" : "source-map",
  },

  pluginOptions: {
    i18n: {},
  },
  pwa: {
    name: 'RSS3://',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    themeColor: '#42b983',
    manifestCrossorigin: 'use-credentials'
  }
};
