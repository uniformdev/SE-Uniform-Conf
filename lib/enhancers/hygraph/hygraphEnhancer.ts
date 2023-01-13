import getConfig from "next/config";
import { GraphQLClient } from "graphql-request";
import { createEnhancer, GetEntryQueryOptionsArgs } from "@uniformdev/canvas-graphcms";

const { serverRuntimeConfig } = getConfig();
const { hygraphUrl, hygraphToken } = serverRuntimeConfig;

export const hygraphEnhancer = () => {
	const client = new GraphQLClient(hygraphUrl, {
		headers: {
			Authorization: hygraphToken,
		},
	});

	return createEnhancer({
    client
  })
};