import { compose, EnhancerBuilder } from "@uniformdev/canvas";
import getConfig from "next/config";

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

const { serverRuntimeConfig } = getConfig();
const {
  contentfulSpaceId,
  contentfulDeliveryToken,
  contentfulEnvironment,
  kontentProjectId,
  kontentDeliveryKey,
  contentstackApiKey,
  contentstackDeliveryToken,
  contentstackEnvironment,
  contentstackRegion,
  sanityProjectId,
  sanityCdnProjectId,
  sanityDataset,
  sanityUseCdn,
  sanityApiVersion,
  hygraphUrl,
  hygraphToken
} = serverRuntimeConfig

const contentfulConfigured: boolean =
  contentfulSpaceId !== undefined && contentfulDeliveryToken !== undefined && contentfulEnvironment !== undefined;

const kontentConfigured: boolean =
  kontentProjectId !== undefined && kontentDeliveryKey !== undefined;

const contentstackConfigured: boolean = 
  contentstackApiKey !== undefined && contentstackDeliveryToken !== undefined && contentstackEnvironment !== undefined && contentstackRegion !== undefined;

const sanityConfigured: boolean = 
  sanityProjectId !== undefined && sanityCdnProjectId !== undefined && sanityDataset !== undefined && sanityUseCdn !== undefined && sanityApiVersion !== undefined;

  const hygraphConfigured: boolean =
  hygraphUrl !== undefined && hygraphToken !== undefined;
  
export const enhancers = new EnhancerBuilder();

if (contentfulConfigured) {
  console.log("Registered Contentful Enhancer");
  enhancers.parameterType(CANVAS_CONTENTFUL_PARAMETER_TYPES, compose(contentfulEnhancer(), contentfulModelConverter))
}

if (kontentConfigured) {
  console.log("Registered Kontent Enhancer");
  enhancers.parameterType(CANVAS_KONTENT_PARAMETER_TYPES, compose(kontentEnhancer(), kontentModelConverter))
}

if (contentstackConfigured) {
  console.log("Registered Contentstack Enhancer");
  enhancers.parameterType(CANVAS_CONTENTSTACK_PARAMETER_TYPES, compose(contentstackEnhancer(), contentstackModelConverter))
}

if (sanityConfigured) {
  console.log("Registered Sanity Enhancer");
  enhancers.parameterType(CANVAS_SANITY_PARAMETER_TYPES, compose(sanityEnhancer(), sanityModelConverter))
}

if (hygraphConfigured) {
  console.log("Registered Hygraph Enhancer");
  enhancers.parameterType(CANVAS_PARAMETER_TYPES, compose(hygraphEnhancer(), hygraphModelConverter));
}

enhancers.parameter((e) => {
  if (typeof e.parameter.value === "string") {
    return e.parameter.value.replace(/personalization/gi, "p13n");
  }
});