// External imports
import getConfig from "next/config";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";

// Canvas-related imports
import {
	RootComponentInstance,
	createUniformApiEnhancer,
} from "@uniformdev/canvas";
import { UniformSlot, UniformComposition } from "@uniformdev/canvas-react";

// Local imports
import { MenuItem } from "@/components/NavigationMenu";
import { MenuItemsProvider } from "@/lib/providers/MenuItemsProvider";
import { getCanvasState } from "@/lib/helpers/canvasUtilities";
import { createCanvasClient } from "@/lib/canvasClient";
import { getNavigationMenu } from "@/lib/helpers/menuItems";
import { isDevelopmentEnvironment } from "@/lib/helpers/environmentUtilities";
import { FOUR_OH_FOUR_COMPOSITION_ID } from "@/constants/compositions";
import { createProjectMapClient } from "@/lib/projectMapClient";
import { renderComponentResolver } from "@/components/canvasComponents";
import { createRouteClient } from "@/lib/routeClient";

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
 * Page component that renders a composition with header, content, and footer slots.
 *
 * @param {Props} { composition, menuItems } - Composition data and menu items.
 * @returns {JSX.Element | null} - Returns the rendered page or null.
 */
const Page = ({ composition, menuItems }: Props) => {
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
				<title>{`UniformConf${composition.parameters?.pageTitle?.value
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
					contextualEditingDefaultPlaceholder={({ id }) => {
						return `This is a placeholder for the ${id} field`;
					}}
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
 * getStaticProps function to fetch the composition and menu items for static site generation.
 *
 * @param {GetStaticPropsContext} context - Context object containing parameters and preview flag.
 * @returns {Promise<{ props: { composition: RootComponentInstance; isPreview: boolean; menuItems: MenuItem[] }; revalidate: number } | { revalidate: number; notFound: boolean } | void>} - Returns the fetched data as props, notFound, or throws an error.
 */
export async function getStaticProps(context: GetStaticPropsContext) {
	const { params, preview } = context;
	const nodePath = params?.id
		? `/${Array.isArray(params.id) ? params.id.join("/") : params.id}`
		: "/";

	try {
		const routeClient = createRouteClient();
		const result = await routeClient.getRoute({
			path: nodePath,
			state: getCanvasState(preview),
			projectMapId,
		});

		if (result.type === "composition") {
			let composition = result.compositionApiResponse.composition;
			return {
				props: {
					composition,
					isPreview: Boolean(preview),
					menuItems: await getNavigationMenu(),
				},
				revalidate: 30,
			};
		}
	} catch (error: any) {
		if (error?.statusCode === 404) {
			if (isDevelopmentEnvironment()) {
				console.log("Composition not found. Responding with 404 page.");
			}
			return {
				revalidate: 30,
				notFound: true,
			};
		}
		throw error;
	}
}

/**
 * getStaticPaths function to determine the static paths for static site generation.
 *
 * @returns {Promise<{ paths: { params: { id: string[] } }[]; fallback: "blocking" }>} - Returns the paths and fallback settings.
 */
export const getStaticPaths: GetStaticPaths = async () => {
	const projectMapClient = createProjectMapClient();
	const { nodes } = await projectMapClient.getNodes({ projectMapId });
	const ids = (
		nodes
			?.filter(
				({ compositionId }) =>
					compositionId && compositionId !== FOUR_OH_FOUR_COMPOSITION_ID
			)
			?.map(({ path }) => path.split("/").filter(Boolean)) ?? []
	).flatMap((id) => [{ params: { id } }, { params: { id } }]);

	return {
		paths: ids,
		fallback: "blocking",
	};
};

// Export Page component as default
export default Page;
