module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/fetch-url/:path*",
        destination: "/fetch-url",
      },
    ];
  },
};
