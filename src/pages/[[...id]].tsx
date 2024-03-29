import getConfig from "next/config";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import {
	RootComponentInstance,
	enhance,
	localize,
	createUniformApiEnhancer,
} from "@uniformdev/canvas";
import { UniformSlot, UniformComposition } from "@uniformdev/canvas-react";
import { MenuItem } from "@/components/NavMenu";
import { LocaleProvider } from "@/lib/providers/LocaleProvider";
import { MenuItemsProvider } from "@/lib/providers/MenuItemsProvider";
import { LOCALE_DUTCH_NETHERLANDS, LOCALE_ENGLISH_UNITED_STATES } from "@/constants/locales";
import { getCanvasState } from "@/lib/helpers/canvasUtilities";
import { canvasClient } from "@/lib/canvasClient";
import { enhancerBuilder } from "@/lib/enhancers";
import { getNavigationMenu } from "@/lib/helpers/menuItems";
import { isDevelopmentEnvironment } from "@/lib/helpers/environmentUtilities";
import { FOUR_OH_FOUR_COMPOSITION_ID, TALKS_COMPOSITION_ID } from "@/constants/compositions";
import { projectMapClient } from "@/lib/projectMapClient";
import { RenderComponentResolver } from "@/components/canvasComponents";

const {
	serverRuntimeConfig: { projectMapId },
} = getConfig();

interface Props {
	composition: RootComponentInstance;
	preview: boolean;
	menuItems: MenuItem[];
	locale: string;
}

const Page = ({ composition, menuItems, locale }: Props) => {
	if (!composition) return null;

	const contextualEditingEnhancer = createUniformApiEnhancer({
		apiUrl: `/api/preview?locale=${locale}`,
	});

	const componentStore = RenderComponentResolver();

	return (
		<LocaleProvider locale={locale}>
			<MenuItemsProvider menuItems={menuItems}>
				<Head>
					<title>{`UniformConf${
						composition._name ? ` | ${composition._name}` : ""
					}`}</title>
					<meta name="description" content="UniformConf"></meta>
				</Head>
				<div>
					<UniformComposition
						data={composition}
						resolveRenderer={componentStore}
						contextualEditingEnhancer={contextualEditingEnhancer}
					>
						<UniformSlot name="Header" />
						<UniformSlot name="Content" />
						<UniformSlot name="Footer" />
					</UniformComposition>
				</div>
			</MenuItemsProvider>
		</LocaleProvider>
	);
};

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
	const { params, preview, locale = LOCALE_ENGLISH_UNITED_STATES } = context;
	const nodePath = params?.id
		? `/${Array.isArray(params.id) ? params.id.join("/") : params.id}`
		: "/";

	try {
		const { composition } =
			await canvasClient.getCompositionByNodePath({
				projectMapNodePath: nodePath,
				state: getCanvasState(preview),
				projectMapId
			});

		await localize({ composition, locale });
		await enhance({ composition, enhancers: enhancerBuilder, context });

		return {
			props: {
				composition,
				isPreview: Boolean(preview),
				menuItems: await getNavigationMenu(),
				locale: locale,
			},
			revalidate: 30,
		};
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

export const getStaticPaths: GetStaticPaths = async () => {
	const { nodes } = await projectMapClient.getNodes({ projectMapId });
	const ids = (
		nodes
			?.filter(
				({ compositionId, path }) =>
					compositionId &&
					compositionId !== FOUR_OH_FOUR_COMPOSITION_ID &&
					(!path.startsWith("/talks") ||
						compositionId === TALKS_COMPOSITION_ID)
			)
			?.map(({ path }) => path.split("/").filter(Boolean)) ?? []
	).flatMap((id) => [
		{ params: { id }, locale: LOCALE_ENGLISH_UNITED_STATES },
		{ params: { id }, locale: LOCALE_DUTCH_NETHERLANDS },
	]);

	return {
		paths: ids,
		fallback: "blocking",
	};
};
