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
import { contentStackModelConverter } from "./contentstack/contentstackModelConverter";

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
} = serverRuntimeConfig;

const contentfulConfigured: boolean =
  contentfulSpaceId !== undefined && contentfulDeliveryToken !== undefined && contentfulEnvironment !== undefined;

const kontentConfigured: boolean =
  kontentProjectId !== undefined && kontentDeliveryKey !== undefined;

const contentstackConfigured: boolean = 
  contentstackApiKey !== undefined && contentstackDeliveryToken !== undefined && contentstackEnvironment !== undefined && contentstackRegion !== undefined;

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
  enhancers.parameterType(CANVAS_CONTENTSTACK_PARAMETER_TYPES, compose(contentstackEnhancer(), contentStackModelConverter))
}

enhancers.parameter((e) => {
  if (typeof e.parameter.value === "string") {
    return e.parameter.value.replace(/personalization/gi, "p13n");
  }
});