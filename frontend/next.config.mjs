/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === "development"
                ? "http://localhost:3001" // development api
                : "http://localhost:3001", // production api
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/**",
            },
        ],
    },
};

export default nextConfig;
