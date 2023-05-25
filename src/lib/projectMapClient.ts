// External imports
import getConfig from "next/config";

// Project Map imports
import { ProjectMapClient } from "@uniformdev/project-map";

// Extract required configuration values
const {
	serverRuntimeConfig: { apiKey, apiHost, projectId },
} = getConfig();

/**
 * Creates a ProjectMapClient instance with the extracted configuration values.
 *
 * @function
 * @returns {ProjectMapClient} - Returns a ProjectMapClient instance.
 */
export function createProjectMapClient() {
	return new ProjectMapClient({
		apiKey,
		apiHost,
		projectId,
	});
}
