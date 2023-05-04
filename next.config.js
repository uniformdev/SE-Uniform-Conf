/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	serverRuntimeConfig: {
		projectMapId: process.env.UNIFORM_PROJECT_MAP_ID,
		projectId: process.env.UNIFORM_PROJECT_ID,
		previewSecret: process.env.UNIFORM_PREVIEW_SECRET,
		apiKey: process.env.UNIFORM_API_KEY,
		apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
	},
};

module.exports = nextConfig;
