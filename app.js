const express = require("express");

const app = express();

app.get("/", (_req, res) => {
  res.json({
    message: "Aplikasi Express berhasil berjalan!",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
