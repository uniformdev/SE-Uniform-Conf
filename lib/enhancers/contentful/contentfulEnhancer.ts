import getConfig from "next/config";
import {
	createContentfulEnhancer,
	CreateContentfulQueryOptions,
} from "@uniformdev/canvas-contentful";
import { createClient } from "contentful";
import { GetStaticPropsContext } from "next";

const { serverRuntimeConfig } = getConfig();
const { contentfulSpaceId, contentfulDeliveryToken, contentfulPreviewToken } =
	serverRuntimeConfig;
const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

export const contentfulEnhancer = () => {
	const client = createClient({
		space: contentfulSpaceId,
		environment: contentfulEnvironment,
		accessToken: contentfulDeliveryToken,
	});

	const previewClient = createClient({
		space: contentfulSpaceId,
		environment: contentfulEnvironment,
		accessToken: contentfulPreviewToken,
		host: "preview.contentful.com",
	});

	return createContentfulEnhancer({
		client,
		previewClient,
		useBatching: false,
		createQuery: ({
			defaultQuery,
			context,
		}: CreateContentfulQueryOptions<GetStaticPropsContext>) => {
			const locale = context.locale ?? context.defaultLocale ?? "en-US";
			defaultQuery.locale = locale;
			defaultQuery.select = ["fields"];
			defaultQuery.include = 2;
			return defaultQuery;
		},
	});
};
