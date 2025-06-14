// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src'); // adjust 'src' if your base folder is different
        return config;
    },
};

module.exports = nextConfig;
