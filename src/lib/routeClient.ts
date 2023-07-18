// External imports
import getConfig from "next/config";

// Canvas-related imports
import { RouteClient } from "@uniformdev/canvas";

// Extract required configuration values
const {
	serverRuntimeConfig: { apiKey, apiHost, edgeApiHost, projectId },
} = getConfig();

/**
 * Creates a new instance of RouteClient using the extracted configuration values.
 *
 * @function
 * @returns {RouteClient} The created RouteClient instance.
 */
export function createRouteClient() {
	return new RouteClient({
		apiKey,
		projectId,
		edgeApiHost,
	});
}
