import getConfig from "next/config";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
  localize
} from "@uniformdev/canvas";
import {
  Composition,
  createApiEnhancer,
  Slot,
  useContextualEditing,
} from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import { projectMapClient } from "../lib/projectMapClient";
import "../components/canvasComponents"
import { enhancerBuilder } from "lib/enhancers";

const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();

export default function Home({
  composition,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  const { composition: compositionInstance } = useContextualEditing({
    initialCompositionValue: composition,
    enhance: createApiEnhancer({
      apiUrl: "/api/preview",
    }),
  });

  return (
    <>
      <Head>
        <title>{`UniformConf${composition?._name ? ` | ${composition?._name}` : ""
          }`}</title>
        <meta name="description" content="UniformConf"></meta>
      </Head>
      <div>
        <Composition data={compositionInstance}>
          <Slot name="Header" />
          <Slot name="Content" />
          <Slot name="Footer" />
        </Composition>
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const { preview } = context;
  const locale = context.locale ?? context.defaultLocale ?? 'en-US';
  //API still in development...hence the unstable.
  const { composition } = await canvasClient.unstable_getCompositionByNodePath({
    projectMapNodePath: slugString ? `/${slugString}` : "/",
    state: process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    projectMapId: projectMapId,
    unstable_resolveData: true,
    unstable_dynamicVariables: { Audience: "Developers", locale: locale },
  });

  await localize({ composition, locale })
  await enhance({ composition, enhancers: enhancerBuilder, context });

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { nodes } = await projectMapClient.getNodes({ projectMapId });

  const ids = nodes?.filter((node) => node.compositionId!).map((node) => node.path.split('/').filter(Boolean)) ?? []
  const paths = ids.flatMap((id) => [
    { params: { id }, locale: 'en-US' },
    { params: { id }, locale: 'nl-NL' }
  ])
  return {
    paths,
    fallback: false,
  };
};