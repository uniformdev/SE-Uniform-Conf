import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";
import {
  Composition,
  createApiEnhancer,
  RenderComponentResolver,
  Slot,
  useContextualEditing,
} from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import { projectMapClient } from "../lib/projectMapClient";
import { resolveRenderer } from "../components";
import getConfig from "next/config";
import { enhancers } from "lib/enhancers";

const PreviewDevPanel = dynamic(
  () => import("lib/preview/PreviewDevPanel/PreviewDevPanel")
);

const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();

export default function Home({
  composition,
  preview,
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
        <title>{`UniformConf${
          composition?._name ? ` | ${composition?._name}` : ""
        }`}</title>
        <meta name="description" content="UniformConf"></meta>
      </Head>
      <div>
        <Composition
          data={compositionInstance}
          resolveRenderer={resolveRenderer as RenderComponentResolver}
        >
          <Slot name="Header" />
          <Slot name="Content" />
          <Slot name="Footer" />
        </Composition>
        {preview && (
          <PreviewDevPanel preview={preview} composition={composition} />
        )}
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return await getProps(context);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { nodes } = await projectMapClient.getNodes({ projectMapId });

  const ids = nodes?.filter((node) => node.compositionId!).map((node) => node.path.split('/').filter(Boolean)) ?? []
  const paths =ids.flatMap((id) => [
    { params: { id }, locale: 'en-US' },
    { params: { id }, locale: 'nl-NL' }
  ])
  return {
    paths,
    fallback: false,
  };
};

async function getProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const { preview } = context;
  //API still in development...hence the unstable.
  const { composition } = await canvasClient.unstable_getCompositionByNodePath({
    projectMapNodePath: slugString ? `/${slugString}` : "/",
    state: process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    projectMapId: projectMapId,
    unstable_resolveData: true,
    unstable_dynamicVariables: { Audience: "Developers", locale: context.locale ?? context.defaultLocale ?? 'en-US' },
  });

  await enhance({ composition, enhancers, context });

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}

