/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		// These are all the locales you want to support in
		// your application
		locales: ["en-US", "nl-NL"],
		// This is the default locale you want to be used when visiting
		// a non-locale prefixed path e.g. `/hello`
		defaultLocale: "en-US",
	},
	serverRuntimeConfig: {
		projectMapId: process.env.UNIFORM_PROJECT_MAP_ID,
		projectId: process.env.UNIFORM_PROJECT_ID,
		previewSecret: process.env.UNIFORM_PREVIEW_SECRET,
		apiKey: process.env.UNIFORM_API_KEY,
		apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
		contentfulConfig: {
			spaceId: process.env.CONTENTFUL_SPACE_ID,
			environment: process.env.CONTENTFUL_ENVIRONMENT,
			previewToken: process.env.CONTENTFUL_CPA_ACCESS_TOKEN,
			deliveryToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
		},
		contentstackConfig: {
			apiKey: process.env.CONTENTSTACK_API_KEY,
			deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
			environment: process.env.CONTENTSTACK_ENVIRONMENT,
			region: process.env.CONTENTSTACK_REGION,
		},
		hygraphConfig: {
			url: process.env.HYGRAPH_URL,
			token: process.env.HYGRAPH_TOKEN,
		},
		kontentConfig: {
			projectId: process.env.KONTENT_PROJECT_ID,
			deliveryKey: process.env.KONTENT_DELIVERY_API_KEY,
		},
		sanityConfig: {
			projectId: process.env.SANITY_PROJECT_ID,
			cdnProjectId: process.env.SANITY_CDN_PROJECT_ID,
			dataset: process.env.SANITY_DATASET,
			useCdn: process.env.SANITY_USE_CDN,
			apiVersion: process.env.SANITY_API_VERSION,
		},
	},
	publicRuntimeConfig: {
		gaTrackingId: process.env.GA4_ID,
	},
};

module.exports = nextConfig;
