import getConfig from "next/config";
import {
	ComponentParameterEnhancer,
	ComponentParameterEnhancerFunction,
	compose,
	EnhancerBuilder,
} from "@uniformdev/canvas";
import { CANVAS_CONTENTFUL_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";
import { contentfulEnhancer } from "./contentful/contentfulEnhancer";
import { contentfulModelConverter } from "./contentful/contentfulModelConverter";
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

const {
	serverRuntimeConfig: {
		contentfulConfig,
		kontentConfig,
		contentstackConfig,
		sanityConfig,
		hygraphConfig,
	},
} = getConfig();

type UniformEnhancer = {
	name: string | string[];
	config: any;
	type: string | readonly string[];
	enhancer: ComponentParameterEnhancer<any, any>;
	converter: ComponentParameterEnhancerFunction<any>;
};

const enhancers: UniformEnhancer[] = [
	{
		name: "Contentful",
		config: contentfulConfig,
		type: CANVAS_CONTENTFUL_PARAMETER_TYPES,
		enhancer: contentfulEnhancer(),
		converter: contentfulModelConverter,
	},
	{
		name: "Contentstack",
		config: contentstackConfig,
		type: CANVAS_CONTENTSTACK_PARAMETER_TYPES,
		enhancer: contentstackEnhancer(),
		converter: contentstackModelConverter,
	},
	{
		name: "Kontent",
		config: kontentConfig,
		type: CANVAS_KONTENT_PARAMETER_TYPES,
		enhancer: kontentEnhancer(),
		converter: kontentModelConverter,
	},
	{
		name: "Hygraph",
		config: hygraphConfig,
		type: CANVAS_PARAMETER_TYPES,
		enhancer: hygraphEnhancer(),
		converter: hygraphModelConverter,
	},
	{
		name: "Sanity",
		config: sanityConfig,
		type: CANVAS_SANITY_PARAMETER_TYPES,
		enhancer: sanityEnhancer(),
		converter: sanityModelConverter,
	},
];

export const enhancerBuilder = new EnhancerBuilder();

enhancers.forEach((enhancer) => {
	if (isConfigured(enhancer.config)) {
		enhancerBuilder.parameterType(
			enhancer.type,
			compose(enhancer.enhancer, enhancer.converter)
		);
		console.log("Registered ", enhancer.name, " Enhancer.");
	}
});

enhancerBuilder.parameter((e) => {
	if (typeof e.parameter.value === "string") {
		return e.parameter.value.replace(/personalization/gi, "p13n");
	}
});

function isConfigured(config: any) {
	Object.entries(config).forEach((setting: any) => {
		if (setting === undefined) {
			return false;
		}
	});

	return true;
}
