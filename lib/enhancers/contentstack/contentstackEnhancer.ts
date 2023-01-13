import getConfig from "next/config";
import {
	createContentstackEnhancer,
	AddContentstackQueryOptions,
} from "@uniformdev/canvas-contentstack";
import contentstack from "contentstack";
import { GetStaticPropsContext } from "next";

const {
	serverRuntimeConfig: {
		contentstackConfig: { environment, region, deliveryToken, apiKey },
	},
} = getConfig();

export const contentstackEnhancer = () => {
	const client = contentstack.Stack({
		api_key: apiKey,
		delivery_token: deliveryToken,
		environment: environment,
		region: region,
	});

	return createContentstackEnhancer({
		client,
		addEntryQueryOptions: ({
			query,
			context,
		}: AddContentstackQueryOptions<GetStaticPropsContext>) => {
			const locale = context.locale ?? context.defaultLocale ?? "en-US";
			query.language(locale.toLowerCase());
			return query;
		},
	});
};
