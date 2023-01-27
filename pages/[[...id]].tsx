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

const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();

export default function Home({
  composition,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: "/api/preview"
  });

  const componentStore = RenderComponentResolver();

  return (
    <>
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