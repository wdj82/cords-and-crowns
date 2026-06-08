/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        // images are served straight from Hygraph via lib/imageLoader.js (custom loader),
        // so the built-in optimizer/allowlist is bypassed; patterns kept for clarity.
        remotePatterns: [
            { protocol: 'https', hostname: '**.graphassets.com' },
            { protocol: 'https', hostname: 'media.graphassets.com' },
        ],
    },
};

module.exports = nextConfig;
