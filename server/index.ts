const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.kinopoisk.dev/v1.4/",
    changeOrigin: true,
  })
);

app.listen(3020, () => {
  console.log("listening");
});
