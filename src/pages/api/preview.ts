// External imports
import getConfig from "next/config";

// Canvas-related imports
import { createPreviewHandler } from "@uniformdev/canvas-next";

/**
 Configuration values for the Next.js app.
*/
const config = getConfig();

/**
 Function to retrieve the preview secret from the app configuration.
 
 @returns {string} - Returns the preview secret from the configuration.
*/
const getPreviewSecret = (): string => {
  return config.serverRuntimeConfig.previewSecret;
};

/**
 Creates a preview handler for Next.js using the secret and enhancers.
*/
const handler = createPreviewHandler({
  secret: getPreviewSecret,
});

/**
 Export the default handler for the preview functionality.
*/
export default handler;
