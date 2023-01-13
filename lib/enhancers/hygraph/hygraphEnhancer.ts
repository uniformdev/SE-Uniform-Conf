import getConfig from "next/config";
import { GraphQLClient } from "graphql-request";
import { createEnhancer } from "@uniformdev/canvas-graphcms";

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
	});
};
