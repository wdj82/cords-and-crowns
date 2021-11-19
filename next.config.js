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
    // eslint-disable-next-line no-unused-vars
    webpack: (config, { defaultLoaders, isServer }) => {
        if (isServer) {
            config.externals.push('_http_common');
        }
        return config;
    },
};

module.exports = nextConfig;
