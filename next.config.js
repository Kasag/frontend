/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  // api/〇〇のパスにアクセスしたらhttp://host.docker.internal:8000/api/〇〇/にリクエストを送る
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:8000/api/:path*/',
      },
    ]
  },
}