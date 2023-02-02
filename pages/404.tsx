import Head from "next/head";
import {
  RootComponentInstance,
  enhance,
  localize,
  createUniformApiEnhancer,
} from "@uniformdev/canvas";
import { UniformSlot, UniformComposition } from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import "../components/canvasComponents";
import { enhancerBuilder } from "lib/enhancers";
import { RenderComponentResolver } from "../components/canvasComponents";
import { MenuItem } from "@/components/NavMenu";
import { MenuItemsProvider } from "lib/providers/MenuItemsProvider";
import { getNavigationMenu } from "lib/helpers/menuItems";
import { FOUR_OH_FOUR_COMPOSITION_ID } from "constants/compositions";
import { GetStaticPropsContext } from "next";
import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";

interface Props {
  composition: RootComponentInstance;
  menuItems: MenuItem[];
}

const FourOhFour = ({ composition, menuItems }: Props) => {
  if (!composition) return null;

  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: "/api/preview",
  });

  const componentResolver = RenderComponentResolver();

  return (
    <MenuItemsProvider menuItems={menuItems}>
      <Head>
        <title>{`UniformConf${composition._name ? ` | ${composition._name}` : ""}`}</title>
        <meta name="description" content="UniformConf" />
      </Head>
      <div>
        <UniformComposition
          data={composition}
          resolveRenderer={componentResolver}
          contextualEditingEnhancer={contextualEditingEnhancer}
        >
          <UniformSlot name="Header" />
          <UniformSlot name="Content" />
          <UniformSlot name="Footer" />
        </UniformComposition>
      </div>
    </MenuItemsProvider>
  );
};

export default FourOhFour;

export async function getStaticProps(
  context: GetStaticPropsContext
) {
  const locale = context.locale || context.defaultLocale || LOCALE_ENGLISH_UNITED_STATES;

  try {
    const { composition } = await canvasClient.getCompositionById({
      compositionId: FOUR_OH_FOUR_COMPOSITION_ID,
    });

    await localize({ composition, locale });
    await enhance({ composition, enhancers: enhancerBuilder, context });

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