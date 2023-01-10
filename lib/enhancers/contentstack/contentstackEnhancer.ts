import getConfig from "next/config";
import {
  createContentstackEnhancer,
  AddContentstackQueryOptions,
} from "@uniformdev/canvas-contentstack";
import contentstack from "contentstack";
import { GetStaticPropsContext } from "next";

export const contentstackEnhancer = () => {
  const { serverRuntimeConfig } = getConfig();
  const {
    contentstackEnvironment,
    contentstackRegion,
    contentstackDeliveryToken,
    contentstackApiKey,
  } = serverRuntimeConfig;

  const client = contentstack.Stack({
    api_key: contentstackApiKey,
    delivery_token: contentstackDeliveryToken,
    environment: contentstackEnvironment,
    region: contentstackRegion,
  });

  return createContentstackEnhancer({
    client,
    addEntryQueryOptions: ({
      query,
      context,
    }: AddContentstackQueryOptions<GetStaticPropsContext>) => {
      const locale = context.locale ?? context.defaultLocale ?? "en-US";
      query.language(locale.toLowerCase());
      return query;
    },
  });
};
