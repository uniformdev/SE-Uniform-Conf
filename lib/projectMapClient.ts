import { ProjectMapClient } from "@uniformdev/project-map";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { apiKey, apiHost, projectId },
} = getConfig();

export const projectMapClient = new ProjectMapClient({
  apiKey,
  apiHost,
  projectId
});
