const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_URI,
      changeOrigin: true,
    })
  );
};
