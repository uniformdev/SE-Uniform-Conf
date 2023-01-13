import getConfig from "next/config";
import {
	AddKontentQueryOptions,
	createKontentEnhancer,
	KontentClientList,
} from "@uniformdev/canvas-kontent";
import { DeliveryClient } from "@kentico/kontent-delivery";
import { GetStaticPropsContext } from "next";

const {
	serverRuntimeConfig: {
		kontentConfig: { projectId, deliveryKey },
	},
} = getConfig();

export const kontentEnhancer = () => {
	const client = new DeliveryClient({
		projectId: projectId,
		secureApiKey: deliveryKey,
	});

	const clientList = new KontentClientList({ client });
	return createKontentEnhancer({
		clients: clientList,
		addEntryQueryOptions: ({
			defaultQuery,
			context,
		}: AddKontentQueryOptions<GetStaticPropsContext>) => {
			const locale = context.locale ?? context.defaultLocale ?? "en-US";
			defaultQuery.languageParameter(locale);
			return defaultQuery;
		},
	});
};
