import getConfig from "next/config";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
  localize,
  createUniformApiEnhancer
} from "@uniformdev/canvas";
import {
  UniformSlot,
  UniformComposition,
} from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import { projectMapClient } from "../lib/projectMapClient";
import "../components/canvasComponents"
import { enhancerBuilder } from "lib/enhancers";
import { RenderComponentResolver } from "../components/canvasComponents";
import { MenuItem } from "@/components/NavMenu";
import { MenuItemsProvider } from "lib/providers/MenuItemsProvider";
import { GetMenuItems } from "lib/helpers/menuItems";
import { FourOhFourCompositionId, TalkCompositionId, TalksCompositionId } from "constants/compositions";
import { localeDutchNetherlands, localeEnglishUnitedStates } from "constants/locales";

const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();

export default function Page({
  composition,
  menuItems
}: {
  preview: boolean;
  composition: RootComponentInstance;
  menuItems: MenuItem[]
}) {
  if (composition === undefined) {
    return null;
  }

  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: "/api/preview"
  });

  const componentStore = RenderComponentResolver();

  return (
    <MenuItemsProvider menuItems={menuItems}>
      <Head>
        <title>{`UniformConf${composition?._name ? ` | ${composition?._name}` : ""
          }`}</title>
        <meta name="description" content="UniformConf"></meta>
      </Head>
      <div>
        <UniformComposition data={composition} resolveRenderer={componentStore} contextualEditingEnhancer={contextualEditingEnhancer}>
          <UniformSlot name="Header" />
          <UniformSlot name="Content" />
          <UniformSlot name="Footer" />
        </UniformComposition>
      </div>
    </MenuItemsProvider>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const { preview } = context;
  const locale = context.locale ?? context.defaultLocale ?? 'en-US';
  //API still in development...hence the unstable.
  try {
    const { composition } = await canvasClient.unstable_getCompositionByNodePath({
      projectMapNodePath: slugString ? `/${slugString}` : "/",
      state: process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
      projectMapId: projectMapId,
      unstable_resolveData: true,
      unstable_dynamicVariables: { locale: locale },
    });

    await localize({ composition, locale })
    await enhance({ composition, enhancers: enhancerBuilder, context });

    return {
      props: {
        composition,
        preview: Boolean(preview),
        menuItems: await GetMenuItems()
      },
      revalidate: 30
    };
  } catch (error: any) {
    if (error?.statusCode === 404) {
      console.log("Composition not found. Let's respond with our 404 page.");
      return {       
        revalidate: 30,
        notFound: true
      };
    } else {
      throw error;
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { nodes } = await projectMapClient.getNodes({ projectMapId });
  const ids = nodes?.filter((node) =>
    node.compositionId! &&
    // Filter out our 404 page
    // Filter out pages that are children of the talks node
    // but include the talks node itself and the talk-placeholder.
    (node.compositionId !== FourOhFourCompositionId && (!node.path.startsWith('/talks')
    || node.compositionId === TalksCompositionId || node.compositionId === TalkCompositionId)))
    .map((node) => node.path.split('/').filter(Boolean)) ?? [];


  const paths = ids.flatMap((id) => [
    { params: { id }, locale: localeEnglishUnitedStates },
    { params: { id }, locale: localeDutchNetherlands }
  ]);

  return {
    paths: paths,
    fallback: 'blocking',
  };
};