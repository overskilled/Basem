/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '', // Leave empty if no port is specified
                pathname: '/v0/b/**', // Match Firebase storage URLs
            },
        ],
    },
};

export default nextConfig;
