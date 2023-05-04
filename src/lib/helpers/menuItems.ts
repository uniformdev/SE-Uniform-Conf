// External imports
import getConfig from "next/config";

// Local imports
import { MenuItem } from "@/components/NavigationMenu";
import { FOUR_OH_FOUR_COMPOSITION_ID } from "@/constants/compositions";
import { createProjectMapClient } from "@/lib/projectMapClient";

const {
	serverRuntimeConfig: { projectMapId },
} = getConfig();

/**
 Function to get the navigation menu items.

 @function
 @returns {Promise<MenuItem[]>} - Returns a promise that resolves with an array of menu items.
*/
export async function getNavigationMenu(): Promise<MenuItem[]> {
	const projectMapClient = createProjectMapClient();
	const tree = await projectMapClient.getSubtree({ projectMapId, depth: 1 });
	const children = tree?.children || [];

	// Filter out the 404 composition and return the remaining menu items
	return children
		.filter(
			({ compositionId }) => compositionId !== FOUR_OH_FOUR_COMPOSITION_ID
		)
		.map(({ name, path }) => ({ name, url: path }));
}
