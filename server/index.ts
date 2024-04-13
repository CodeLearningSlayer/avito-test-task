const express = require("express");
const cors = require("cors");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.kinopoisk.dev/",
    changeOrigin: true,
  })
);

app.listen(3020, () => {
  console.log("listening");
});
