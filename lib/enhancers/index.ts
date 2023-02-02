import getConfig from "next/config";
import {
	ComponentParameterEnhancer,
	ComponentParameterEnhancerFunction,
	compose,
	EnhancerBuilder,
} from "@uniformdev/canvas";
import {
	CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
	CANVAS_CONTENTFUL_PARAMETER_TYPES,
	CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
} from "@uniformdev/canvas-contentful";
import {
	contentfulEnhancer,
	contentfulMultiEnhancer,
	contentfulQueryEnhancer,
} from "./contentful/contentfulEnhancer";
import { contentfulModelConverter } from "./contentful/contentfulModelConverter";
import { contentfulArrayModelConverter } from "./contentful/contentfulArrayModelConverter";
import { CANVAS_KONTENT_PARAMETER_TYPES } from "@uniformdev/canvas-kontent";
import { kontentEnhancer } from "./kontent/kontentEnhancer";
import { kontentModelConverter } from "./kontent/kontentModelConverter";
import { CANVAS_CONTENTSTACK_PARAMETER_TYPES } from "@uniformdev/canvas-contentstack";
import { contentstackEnhancer } from "./contentstack/contentstackEnhancer";
import { contentstackModelConverter } from "./contentstack/contentstackModelConverter";
import { CANVAS_SANITY_PARAMETER_TYPES } from "@uniformdev/canvas-sanity";
import { sanityModelConverter } from "./sanity/sanityModelConverter";
import { sanityEnhancer } from "./sanity/sanityEnhancer";
import { CANVAS_PARAMETER_TYPES } from "@uniformdev/canvas-graphcms";
import { hygraphEnhancer } from "./hygraph/hygraphEnhancer";
import { hygraphModelConverter } from "./hygraph/hygraphModelConverter";
import { STRAPI_PARAMETER_TYPES } from "@uniformdev/canvas-strapi";
import { strapiEnhancer } from "./strapi/strapiEnhancer";
import { strapiModelConverter } from "./strapi/strapiModelConverter";

const {
	serverRuntimeConfig: {
		contentfulConfig,
		contentstackConfig,
		hygraphConfig,
		kontentConfig,
		sanityConfig,
		strapiConfig,
	},
} = getConfig();

const enhancers: EnhancerConfiguration[] = [
	{
		name: "Contentful",
		type: CANVAS_CONTENTFUL_PARAMETER_TYPES,
		enhancer: contentfulEnhancer,
		converter: contentfulModelConverter,
		config: [
			contentfulConfig.spaceId,
			contentfulConfig.environment,
			contentfulConfig.previewToken,
			contentfulConfig.deliveryToken,
		],
	},
	{
		name: "Contentful Multi",
		type: CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
		enhancer: contentfulMultiEnhancer,
		converter: contentfulArrayModelConverter,
		config: [
			contentfulConfig.spaceId,
			contentfulConfig.environment,
			contentfulConfig.previewToken,
			contentfulConfig.deliveryToken,
		],
	},
	{
		name: "Contentful Query",
		type: CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
		enhancer: contentfulQueryEnhancer,
		converter: contentfulArrayModelConverter,
		config: [
			contentfulConfig.spaceId,
			contentfulConfig.environment,
			contentfulConfig.previewToken,
			contentfulConfig.deliveryToken,
		],
	},
	{
		name: "Contentstack",
		type: CANVAS_CONTENTSTACK_PARAMETER_TYPES,
		enhancer: contentstackEnhancer,
		converter: contentstackModelConverter,
		config: [
			contentstackConfig.apiKey,
			contentstackConfig.deliveryToken,
			contentstackConfig.environment,
			contentstackConfig.region,
		],
	},
	{
		name: "Hygraph",
		type: CANVAS_PARAMETER_TYPES,
		enhancer: hygraphEnhancer,
		converter: hygraphModelConverter,
		config: [hygraphConfig.url, hygraphConfig.token],
	},
	{
		name: "Kontent",
		type: CANVAS_KONTENT_PARAMETER_TYPES,
		enhancer: kontentEnhancer,
		converter: kontentModelConverter,
		config: [kontentConfig.projectId, kontentConfig.deliveryKey],
	},
	{
		name: "Sanity",
		type: CANVAS_SANITY_PARAMETER_TYPES,
		enhancer: sanityEnhancer,
		converter: sanityModelConverter,
		config: [
			sanityConfig.projectId,
			sanityConfig.cdnProjectId,
			sanityConfig.dataset,
			sanityConfig.useCdn,
			sanityConfig.apiVersion,
		],
	},
	{
		name: "Strapi",
		type: STRAPI_PARAMETER_TYPES,
		enhancer: strapiEnhancer,
		converter: strapiModelConverter,
		config: [strapiConfig.apiHost, strapiConfig.apiToken],
	},
];

export const enhancerBuilder = new EnhancerBuilder();

enhancers.forEach((enhancer) => {
	if (enhancer.config.every((cfg) => cfg)) {
		enhancerBuilder.parameterType(
			enhancer.type,
			compose(enhancer.enhancer(), enhancer.converter)
		);

		console.log(`Registered ${enhancer.name} Enhancer.`);
	}
});

enhancerBuilder.parameter((e) => {
	if (typeof e.parameter.value === "string") {
		return e.parameter.value.replace(/personalization/gi, "p13n");
	}
});

type EnhancerConfiguration = {
	name: string | string[];
	type: string | readonly string[];
	enhancer: () => ComponentParameterEnhancer<any, any>;
	converter: ComponentParameterEnhancerFunction<any>;
	config: string[];
};
