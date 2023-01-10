/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'nl-NL'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
  serverRuntimeConfig: {
    projectMapId: process.env.UNIFORM_PROJECT_MAP_ID,
    projectId: process.env.UNIFORM_PROJECT_ID,
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    contentfulPreviewToken: process.env.CONTENTFUL_CPA_ACCESS_TOKEN,
    contentfulDeliveryToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
    kontentProjectId: process.env.KONTENT_PROJECT_ID,
    kontentDeliveryKey: process.env.KONTENT_DELIVERY_API_KEY,
    contentstackApiKey: process.env.CONTENTSTACK_API_KEY,
    contentstackDeliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    contentstackEnvironment: process.env.CONTENTSTACK_ENVIRONMENT,
    contentstackRegion: process.env.CONTENTSTACK_REGION
  },
  publicRuntimeConfig: {
    gaTrackingId: process.env.GA4_ID,
    edgeEnabled: false,
    apiKey: process.env.UNIFORM_API_KEY,
  },
};

module.exports = nextConfig;
