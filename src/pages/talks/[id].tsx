// External imports
import getConfig from "next/config";
import Head from "next/head";

// Canvas-related imports
import {
	RootComponentInstance,
	createUniformApiEnhancer,
} from "@uniformdev/canvas";
import { UniformSlot, UniformComposition } from "@uniformdev/canvas-react";
import { unstable_withUniformGetServerSideProps } from "@uniformdev/canvas-next/route";

// Local imports
import { MenuItem } from "@/components/NavigationMenu";
import { MenuItemsProvider } from "@/lib/providers/MenuItemsProvider";
import { renderComponentResolver } from "@/components/canvasComponents";
import { getNavigationMenu } from "@/lib/helpers/menuItems";
import { getCanvasState } from "@/lib/helpers/canvasUtilities";
import { isDevelopmentEnvironment } from "@/lib/helpers/environmentUtilities";

// Extract configuration values
const {
	serverRuntimeConfig: { projectMapId },
} = getConfig();

// Props interface declaration
interface Props {
	composition: RootComponentInstance;
	preview: boolean;
	menuItems: MenuItem[];
	locale: string;
}

/**
 TalkPage component that renders a composition with header, content, and footer slots.

 @param {Props} { composition, menuItems } - Composition data and menu items.
 @returns {JSX.Element | null} - Returns the rendered page or null.
*/
const TalkPage = ({ composition, menuItems }: Props) => {
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
						? ` | ${composition.parameters.pageTitle.value}`
						: ""
				}`}</title>
				<meta name="description" content="UniformConf"></meta>
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

/**
 Retrieves server-side props for the page using Uniform's getServerSideProps functionality.

 @param {object} requestOptions - Options for the request to Uniform.
 @param {object} requestOptions.state - The state of the Uniform canvas.
 @returns {Promise<object>} - The server-side props.
*/
export const getServerSideProps = unstable_withUniformGetServerSideProps({
	requestOptions: {
		state: getCanvasState(),
	},
	/**
	 Handles the composition data for the page.
	 
	 @param {object} composition - The composition data.
	 @returns {Promise<object>} - The composition props.
	*/
	async handleComposition(composition) {
		if (
			composition.compositionApiResponse.errors?.some(
				(e) => e.type === "data" || e.type === "binding"
			)
		) {
			// if we got data error or warning, we could not resolve a data resource and we choose to return a 404 page.
			if (isDevelopmentEnvironment()) {
				console.log("Composition not found. Responding with 404 page.");
			}
			return {
				notFound: true,
			};
		}

		return {
			props: {
				composition: composition.compositionApiResponse.composition,
				isPreview: Boolean(composition.compositionApiResponse.state),
				menuItems: await getNavigationMenu(),
			},
		};
	},
});

// Export TalkPage component as default
export default TalkPage;
