import getConfig from "next/config";
import {
	ContentfulClientList,
	createContentfulEnhancer,
	CreateContentfulQueryApiQueryOptions,
	createContentfulQueryEnhancer,
	CreateContentfulQueryOptions,
} from "@uniformdev/canvas-contentful";
import { createClient } from "contentful";
import { GetStaticPropsContext } from "next";

const {
	serverRuntimeConfig: {
		contentfulConfig: { spaceId, deliveryToken, previewToken, environment },
	},
} = getConfig();

export const contentfulEnhancer = () => {
	const client = createClient({
		space: spaceId,
		environment: environment,
		accessToken: deliveryToken,
	});

	const previewClient = createClient({
		space: spaceId,
		environment: environment,
		accessToken: previewToken,
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

export const contentfulQueryEnhancer = () => {
	const client = createClient({
		space: spaceId,
		environment: environment,
		accessToken: deliveryToken,
	});

	const previewClient = createClient({
		space: spaceId,
		environment: environment,
		accessToken: previewToken,
		host: "preview.contentful.com",
	});

	const clientList = new ContentfulClientList({client, previewClient});

	return createContentfulQueryEnhancer({
		clients: clientList,
		createQuery: ({
			defaultQuery,
			context,
		}: CreateContentfulQueryApiQueryOptions<GetStaticPropsContext>) => {
			const locale = context.locale ?? context.defaultLocale ?? "en-US";
			defaultQuery.locale = locale;
			defaultQuery.select = ["fields"];
			defaultQuery.include = 2;
			return defaultQuery;
		},
	});
}
