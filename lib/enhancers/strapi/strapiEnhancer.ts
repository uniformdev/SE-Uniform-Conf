import getConfig from "next/config";
import {
	createEnhancer,
	GetEntryQueryOptionsArgs,
	StrapiClient,
} from "@uniformdev/canvas-strapi";
import { GetStaticPropsContext } from "next";
import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";
import { StrapiLocale } from 'strapi-sdk-js';

const {
	serverRuntimeConfig: {
		strapiConfig: { apiHost, apiToken },
	},
} = getConfig();

export const strapiEnhancer = () => {
	const client = new StrapiClient({
		apiToken,
		apiHost,
		populate: ["Image", "localizations"],
	});

	return createEnhancer({ clients: client });
};
