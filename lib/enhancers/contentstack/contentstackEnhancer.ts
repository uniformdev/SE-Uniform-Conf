import getConfig from "next/config";
import {
	createContentstackEnhancer,
	AddContentstackQueryOptions,
} from "@uniformdev/canvas-contentstack";
import contentstack from "contentstack";
import { GetStaticPropsContext } from "next";
import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";

const {
	serverRuntimeConfig: {
		contentstackConfig: { environment, region, deliveryToken, apiKey },
	},
} = getConfig();

export const contentstackEnhancer = () => {
	const client = contentstack.Stack({
		api_key: apiKey,
		delivery_token: deliveryToken,
		environment,
		region,
	});

	return createContentstackEnhancer({
		client,
		addEntryQueryOptions: ({
			query,
			context,
		}: AddContentstackQueryOptions<GetStaticPropsContext>) => {
			const locale = context.locale || context.defaultLocale || LOCALE_ENGLISH_UNITED_STATES;
			return query.language(locale.toLowerCase());
		},
	});
};
