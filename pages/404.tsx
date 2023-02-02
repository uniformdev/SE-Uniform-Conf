import getConfig from "next/config";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import {
  RootComponentInstance,
  enhance,
  localize,
  createUniformApiEnhancer
} from "@uniformdev/canvas";
import {
  UniformSlot,
  UniformComposition,
} from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import "../components/canvasComponents"
import { enhancerBuilder } from "lib/enhancers";
import { RenderComponentResolver } from "../components/canvasComponents";
import { MenuItem } from "@/components/NavMenu";
import { MenuItemsProvider } from "lib/providers/MenuItemsProvider";
import { GetMenuItems } from "lib/helpers/menuItems";
import { FourOhFourCompositionId } from "constants/compositions";

const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();

export default function FourOhFour({
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
  const locale = context.locale ?? context.defaultLocale ?? 'en-US';
  //API still in development...hence the unstable.
  try {
    const { composition } = await canvasClient.getCompositionById({
      compositionId: FourOhFourCompositionId
    });

    await localize({ composition, locale })
    await enhance({ composition, enhancers: enhancerBuilder, context });

    return {
      props: {
        composition,
        menuItems: await GetMenuItems()
      },
      revalidate: 30
    };
  } catch (error: any) {
    console.log("An error occurred when we tried to generate our 404 page.")
    throw error;
  }
}