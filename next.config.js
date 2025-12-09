/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['media.graphassets.com', 'us-east-1.graphassets.com'],
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
