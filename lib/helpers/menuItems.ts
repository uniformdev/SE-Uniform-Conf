import { MenuItem } from "@/components/NavMenu";
import { FOUR_OH_FOUR_COMPOSITION_ID } from "constants/compositions";
import { projectMapClient } from "lib/projectMapClient";
import getConfig from "next/config";

const {
	serverRuntimeConfig: { projectMapId },
} = getConfig();

export async function getNavigationMenu(): Promise<MenuItem[]> {
	const tree = await projectMapClient.getSubtree({ projectMapId, depth: 1 });
	const children = tree?.children || [];

	return children
		.filter(
			({ compositionId }) => compositionId !== FOUR_OH_FOUR_COMPOSITION_ID
		)
		.map(({ name, path }) => ({ name, url: path }));
}
