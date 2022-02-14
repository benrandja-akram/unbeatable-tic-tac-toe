/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/note.mp3',
        headers: [
          {
            key: 'cache-control',
            value: 'public,max-age=31536000,immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
