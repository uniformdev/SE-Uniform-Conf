import getConfig from "next/config";
import { GraphQLClient } from "graphql-request";
import { createEnhancer, GetEntryQueryOptionsArgs } from "@uniformdev/canvas-graphcms";
import { GetStaticPropsContext } from "next";

const { serverRuntimeConfig } = getConfig();
const { hygraphUrl, hygraphToken } = serverRuntimeConfig;

export const hygraphEnhancerDutch = () => {
	const client = new GraphQLClient(hygraphUrl, {
		headers: {
			Authorization: hygraphToken,
      'gcms-locales': 'nl_NL'
		},
	});

	return createEnhancer({
    client,
    onGetEntryQueryOptions: ({ defaultEntryQueryOptions }: GetEntryQueryOptionsArgs<GetStaticPropsContext>) => {
        return defaultEntryQueryOptions;
    },
  })
};

export const hygraphEnhancerDefault = () => {
	const client = new GraphQLClient(hygraphUrl, {
		headers: {
			Authorization: hygraphToken,
      'gcms-locales': 'en_US'
		},
	});

	return createEnhancer({
    client,
    onGetEntryQueryOptions: ({ defaultEntryQueryOptions }: GetEntryQueryOptionsArgs<GetStaticPropsContext>) => {
        return defaultEntryQueryOptions;
    },
  })
};