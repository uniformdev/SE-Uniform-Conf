// External imports
import getConfig from "next/config";

// Canvas-related imports
import { CanvasClient } from "@uniformdev/canvas";

// Extract required configuration values
const {
	serverRuntimeConfig: { apiKey, apiHost, edgeApiHost, projectId },
} = getConfig();

/**
 Creates a new instance of CanvasClient using the extracted configuration values.
 
 @function
 @returns {CanvasClient} The created CanvasClient instance.
*/
export function createCanvasClient() {
	return new CanvasClient({
		apiKey,
		apiHost,
		projectId,
		edgeApiHost
	});
}
