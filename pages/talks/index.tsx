import getConfig from "next/config";
import { GetStaticPropsContext } from "next";
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

export default function Index({
    composition,
    menuItems
}: {
    preview: boolean;
    composition: RootComponentInstance;
    menuItems: MenuItem[]
}) {
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
    const { preview } = context;
    const locale = context.locale ?? context.defaultLocale ?? 'en-US';
    //API still in development...hence the unstable.
    //Retrieving the Talks composition by ID directly.
    const { composition } = await canvasClient.getCompositionById({
        state: process.env.NODE_ENV === 'development' || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
        compositionId: '59dcfc87-5352-47ed-b442-d9a463705863',
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
    };
}