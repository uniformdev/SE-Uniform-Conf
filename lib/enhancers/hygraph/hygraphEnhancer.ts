import getConfig from "next/config";
import { GraphQLClient } from "graphql-request";
import { createEnhancer, GetEntryQueryOptionsArgs } from "@uniformdev/canvas-graphcms";
import { GetStaticPropsContext } from "next";
import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";

const {
	serverRuntimeConfig: {
		hygraphConfig: { url, token },
	},
} = getConfig();

export const hygraphEnhancer = () => {
	const client = new GraphQLClient(url, {
		headers: {
			Authorization: token,
		},
	});

	return createEnhancer({
		client,
		onGetEntryQueryOptions: ({
			defaultEntryQueryOptions,
			context,
		}: GetEntryQueryOptionsArgs<GetStaticPropsContext>) => {
			const locale = context.locale || context.defaultLocale || LOCALE_ENGLISH_UNITED_STATES;
			// defaultEntryQueryOptions.locale = locale.replace('-', '_');
			// defaultEntryQueryOptions.fallbackLocale = (context.defaultLocale || LOCALE_ENGLISH_UNITED_STATES).replace('-', '_');
			return defaultEntryQueryOptions;
		},
	});
};
