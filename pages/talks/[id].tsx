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
import "../../components/canvasComponents"
import { enhancerBuilder } from "lib/enhancers";
import { RenderComponentResolver } from "../../components/canvasComponents";
import { MenuItem } from "@/components/NavMenu";
import { MenuItemsProvider } from "lib/providers/MenuItemsProvider";
import { GetMenuItems } from "lib/helpers/menuItems";
import { createClient } from "contentful";
import { DynamicTalkProvider } from "lib/providers/DynamicTalkProvider";
import { Talk } from "@/components/DynamicTalk";

const talkContentEntryType = "talk";

export default function DynamicTalkPage({
  composition,
  menuItems,
  talk
}: {
  preview: boolean;
  composition: RootComponentInstance;
  menuItems: MenuItem[];
  talk: Talk;
}) {
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: "/api/preview"
  });

  const componentStore = RenderComponentResolver();

  return (
    <MenuItemsProvider menuItems={menuItems}>
      <Head>
        <title>{`UniformConf${composition?._name ? ` | ${composition?._name}` : ""}`}</title>
        <meta name="description" content="UniformConf"></meta>
      </Head>
      <div>
        <UniformComposition data={composition} resolveRenderer={componentStore} contextualEditingEnhancer={contextualEditingEnhancer}>
          <UniformSlot name="Header" />
          <DynamicTalkProvider talk={talk} >
            <UniformSlot name="Content" />
          </DynamicTalkProvider>
          <UniformSlot name="Footer" />
        </UniformComposition>
      </div>
    </MenuItemsProvider>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const { preview } = context;
  const locale = context.locale ?? context.defaultLocale ?? 'en-US';
  //API still in development...hence the unstable.
  //Retrieving the Talks composition by ID directly.
  const { composition } = await canvasClient.getCompositionById({
    state: process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    compositionId: '2f7908ab-8aeb-4bb4-aabd-dfe7616ce870',
    unstable_resolveData: true,
    unstable_dynamicVariables: { locale: locale },
  });

  await localize({ composition, locale })
  await enhance({ composition, enhancers: enhancerBuilder, context });

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

  var talks = await client.getEntries<Talk>({ locale: locale, content_type: talkContentEntryType, "fields.slug": slug ? slug : "" });

  return {
    props: {
      composition,
      preview: Boolean(preview),
      menuItems: await GetMenuItems(),
      talk: talks.items[0]
    },
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

  var talks = await client.getEntries({ content_type: talkContentEntryType });

  const paths = talks.items.flatMap((talk: any) => [
    { params: { id: talk.fields.slug }, locale: 'en-US' },
    { params: { id: talk.fields.slug }, locale: 'nl-NL' }
  ]);

  return {
    paths,
    fallback: false,
  };
};