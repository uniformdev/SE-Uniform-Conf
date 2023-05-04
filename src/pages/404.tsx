// External imports
import Head from "next/head";

// Canvas-related imports
import {
	RootComponentInstance,
	createUniformApiEnhancer,
} from "@uniformdev/canvas";
import { UniformSlot, UniformComposition } from "@uniformdev/canvas-react";

// Local imports
import "../components/canvasComponents";
import { MenuItem } from "@/components/NavigationMenu";
import { MenuItemsProvider } from "@/lib/providers/MenuItemsProvider";
import { getNavigationMenu } from "@/lib/helpers/menuItems";
import { createCanvasClient } from "@/lib/canvasClient";
import { renderComponentResolver } from "../components/canvasComponents";
import { FOUR_OH_FOUR_COMPOSITION_ID } from "@/constants/compositions";
import { create } from "domain";

// Props interface declaration
interface Props {
	composition: RootComponentInstance;
	menuItems: MenuItem[];
}

/**
 FourOhFour component which renders the 404 page.

 @param {Props} { composition, menuItems } - Composition data and menu items.
 @returns {JSX.Element | null} - Returns the rendered 404 page or null.
*/
const FourOhFour = ({ composition, menuItems }: Props) => {
	// If the composition is not available, return null
	if (!composition) return null;

	// Create a Uniform API enhancer for contextual editing
	const contextualEditingEnhancer = createUniformApiEnhancer({
		apiUrl: "/api/preview",
	});

	// Create a resolver for custom components
	const componentStore = renderComponentResolver();

	return (
		<MenuItemsProvider menuItems={menuItems}>
			<Head>
				<title>{`UniformConf${
					composition.parameters?.pageTitle?.value
						? ` | ${composition.parameters?.pageTitle.value}`
						: ""
				}`}</title>
				<meta name="description" content="UniformConf" />
			</Head>
			<div>
				<UniformComposition
					data={composition}
					resolveRenderer={componentStore}
					contextualEditingEnhancer={contextualEditingEnhancer}
				>
					<UniformSlot name="header" />
					<UniformSlot name="body" />
					<UniformSlot name="footer" />
				</UniformComposition>
			</div>
		</MenuItemsProvider>
	);
};

// Export FourOhFour component as default
export default FourOhFour;

/**
 getStaticProps function to fetch the composition and menu items for static site generation.

 @returns {Promise<{ props: { composition: RootComponentInstance; menuItems: MenuItem[] }; revalidate: number } | void>} - Returns the fetched data as props or throws an error.
*/
export async function getStaticProps() {
	try {
		const canvasClient = createCanvasClient();
		const { composition } = await canvasClient.getCompositionById({
			compositionId: FOUR_OH_FOUR_COMPOSITION_ID,
		});

		return {
			props: {
				composition,
				menuItems: await getNavigationMenu(),
			},
			revalidate: 30,
		};
	} catch (error) {
		console.error("An error occurred when generating the 404 page.");
		throw error;
	}
}
