import getConfig from "next/config";
import {
	ContentfulClientList,
	createContentfulEnhancer,
	createContentfulMultiEnhancer,
	CreateContentfulMultiEntryQueryOptions,
	CreateContentfulQueryApiQueryOptions,
	createContentfulQueryEnhancer,
	CreateContentfulQueryOptions,
} from "@uniformdev/canvas-contentful";
import { createClient } from "contentful";
import { GetStaticPropsContext } from "next";
import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";

const {
	serverRuntimeConfig: {
		contentfulConfig: { spaceId, deliveryToken, previewToken, environment },
	},
} = getConfig();

const createContentfulClient = () =>
	createClient({
		space: spaceId,
		environment,
		accessToken: deliveryToken,
	});

const createPreviewClient = () =>
	createClient({
		space: spaceId,
		environment,
		accessToken: previewToken,
		host: "preview.contentful.com",
	});

const getLocale = (context: GetStaticPropsContext) =>
	context.locale ?? context.defaultLocale ?? LOCALE_ENGLISH_UNITED_STATES;

export const contentfulEnhancer = () => {
	const client = createContentfulClient();
	const previewClient = createPreviewClient();

	return createContentfulEnhancer({
		client,
		previewClient,
		useBatching: false,
		createQuery: ({
			defaultQuery,
			context,
		}: CreateContentfulQueryOptions<GetStaticPropsContext>) => {
			const locale = getLocale(context);
			return {
				...defaultQuery,
				locale,
				select: ["fields"],
				include: 2,
			};
		},
	});
};

export const contentfulMultiEnhancer = () => {
	const client = createContentfulClient();
	const previewClient = createPreviewClient();
	const clientList = new ContentfulClientList({ client, previewClient });

	return createContentfulMultiEnhancer({
		clients: clientList,
		createQuery: ({
			defaultQuery,
			context,
		}: CreateContentfulMultiEntryQueryOptions<GetStaticPropsContext>) => {
			const locale = getLocale(context);
			return {
				...defaultQuery,
				locale,
				select: ["fields"],
				include: 2,
			};
		},
	});
};

export const contentfulQueryEnhancer = () => {
	const client = createContentfulClient();
	const previewClient = createPreviewClient();
	const clientList = new ContentfulClientList({ client, previewClient });

	return createContentfulQueryEnhancer({
		clients: clientList,
		createQuery: ({
			defaultQuery,
			context,
		}: CreateContentfulQueryApiQueryOptions<GetStaticPropsContext>) => {
			const locale = getLocale(context);
			return {
				...defaultQuery,
				locale,
				select: ["fields"],
				include: 2,
			};
		},
	});
};
