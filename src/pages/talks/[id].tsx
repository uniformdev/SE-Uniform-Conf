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
import { canvasClient } from "@/lib/canvasClient";
import "../../components/canvasComponents";
import { enhancerBuilder } from "@/lib/enhancers";
import { RenderComponentResolver } from "../../components/canvasComponents";
import { MenuItem } from "@/components/NavMenu";
import { MenuItemsProvider } from "@/lib/providers/MenuItemsProvider";
import { getNavigationMenu } from "@/lib/helpers/menuItems";
import { createClient } from "contentful";
import {
	DynamicTalkProvider,
	PlaceholderTalk,
} from "@/lib/providers/DynamicTalkProvider";
import { Talk } from "@/components/DynamicTalk";
import { projectMapClient } from "@/lib/projectMapClient";
import { DYNAMIC_TALK_COMPOSITION_ID } from "@/constants/compositions";
import {
	LOCALE_DUTCH_NETHERLANDS,
	LOCALE_ENGLISH_UNITED_STATES,
} from "@/constants/locales";
import { TALK_CONTENT_ENTRY_TYPE } from "@/constants/contentful";
import { getCanvasState } from "@/lib/helpers/canvasUtilities";

const {
	serverRuntimeConfig: { projectMapId },
} = getConfig();

interface Props {
	composition: RootComponentInstance;
	menuItems: MenuItem[];
	talk: Talk;
	locale: string;
}

const DynamicTalkPage = ({ composition, menuItems, talk, locale }: Props) => {
	if (!composition) return null;

	const contextEditingEnhancer = createUniformApiEnhancer({
		apiUrl: `/api/preview?locale=${locale}`,
	});

	const componentStore = RenderComponentResolver();

	return (
		<MenuItemsProvider menuItems={menuItems}>
			<Head>
				<title>{`UniformConf${
					composition._name ? ` | ${composition._name}` : ""
				}`}</title>
				<meta name="description" content="UniformConf" />
			</Head>
			<div>
				<UniformComposition
					data={composition}
					resolveRenderer={componentStore}
					contextualEditingEnhancer={contextEditingEnhancer}
				>
					<UniformSlot name="Header" />
					<DynamicTalkProvider talk={talk}>
						<UniformSlot name="Content" />
					</DynamicTalkProvider>
					<UniformSlot name="Footer" />
				</UniformComposition>
			</div>
		</MenuItemsProvider>
	);
};

export default DynamicTalkPage;

export async function getStaticProps(context: GetStaticPropsContext) {
	const { id: slug } = context.params || {};
	const { preview } = context;
	const locale =
		context.locale || context.defaultLocale || LOCALE_ENGLISH_UNITED_STATES;

	const nodesResult = await projectMapClient.getNodes({
		projectMapId,
		path: "/talks",
	});

	let compositionId = undefined;

	nodesResult?.nodes?.forEach((node: any) => {
		if (node.pathSegment === slug && node.compositionId && node.compositionId !== DYNAMIC_TALK_COMPOSITION_ID) {
			compositionId = node.compositionId;
		}
	});

	const {
		serverRuntimeConfig: {
			contentfulConfig: { spaceId, deliveryToken, environment },
		},
	} = getConfig();

	const client = createClient({
		space: spaceId,
		environment,
		accessToken: deliveryToken,
	});

	const talks = await client.getEntries<Talk>({
		locale,
		content_type: TALK_CONTENT_ENTRY_TYPE,
		'fields.slug': slug || ""
	});

	if (compositionId === undefined) {
		if (talks.total > 0) {
			compositionId = DYNAMIC_TALK_COMPOSITION_ID;
		} else {
			return {
				revalidate: 30,
				notFound: true,
			};
		}
	}

	const { composition } = await canvasClient.getCompositionById({
		state: getCanvasState(preview),
		compositionId
	});

	await localize({ composition, locale });
	await enhance({ composition, enhancers: enhancerBuilder, context });

	return {
		props: {
			composition,
			preview: Boolean(preview),
			menuItems: await getNavigationMenu(),
			talk: talks.items.length ? talks.items[0] : PlaceholderTalk,
			locale: locale,
		},
		revalidate: 30,
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		serverRuntimeConfig: {
			contentfulConfig: { spaceId, deliveryToken, environment },
		},
	} = getConfig();

	const client = createClient({
		space: spaceId,
		environment: environment,
		accessToken: deliveryToken,
	});

	const contentfulResult = await client.getEntries({
		content_type: TALK_CONTENT_ENTRY_TYPE,
	});

	const paths = contentfulResult.items.flatMap((talk: any) => [
		{ params: { id: talk.fields.slug }, locale: LOCALE_ENGLISH_UNITED_STATES },
		{ params: { id: talk.fields.slug }, locale: LOCALE_DUTCH_NETHERLANDS },
	]);

	return {
		paths: paths,
		fallback: true,
	};
};
