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
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('_http_common');
        }
        return config;
    },
    target: 'experimental-serverless-trace',
};

module.exports = nextConfig;
