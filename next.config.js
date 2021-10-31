/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // domains: ['res.cloudinary.com'],
        domains: ['media.graphcms.com'],
    },
    generateBuildId: () => 'build',
};

module.exports = nextConfig;
