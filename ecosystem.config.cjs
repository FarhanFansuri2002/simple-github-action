module.exports = {
  apps: [
    {
      name: "express-vps-app",
      script: "server.js",
      cwd: process.env.APP_CWD || __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
