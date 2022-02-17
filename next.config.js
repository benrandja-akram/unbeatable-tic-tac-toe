/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
      {
        source: '/note-low.mp3',
        headers: [
          {
            key: 'cache-control',
            value: 'public,max-age=31536000,immutable',
          },
        ],
      },
      {
        source: '/game-over.mp3',
        headers: [
          {
            key: 'cache-control',
            value: 'public,max-age=31536000,immutable',
          },
        ],
      },
      {
        source: '/game-over-tie.mp3',
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
