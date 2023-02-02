import getConfig from "next/config";
import { DeliveryClient } from "@kentico/kontent-delivery";
import {
	createKontentEnhancer,
	KontentClientList,
	AddKontentQueryOptions,
} from "@uniformdev/canvas-kontent";
import { GetStaticPropsContext } from "next";
import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";

const {
	serverRuntimeConfig: {
		kontentConfig: { projectId, deliveryKey },
	},
} = getConfig();

export const kontentEnhancer = () => {
	const client = new DeliveryClient({
		projectId,
		secureApiKey: deliveryKey,
	});

	const clients = new KontentClientList({ client });

	return createKontentEnhancer({
		clients,
		addEntryQueryOptions: ({
			defaultQuery,
			context,
		}: AddKontentQueryOptions<GetStaticPropsContext>) => {
			const locale = context.locale || context.defaultLocale || LOCALE_ENGLISH_UNITED_STATES;
			defaultQuery.languageParameter(locale);
			return defaultQuery;
		},
	});
};
