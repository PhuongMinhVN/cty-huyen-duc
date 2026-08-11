module.exports = {
  apps: [
    {
      name: "huyenduc-web",
      script: "./server.js",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3009,
      },
    },
  ],
};
