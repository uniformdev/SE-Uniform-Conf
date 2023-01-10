import { enhance } from "@uniformdev/canvas";
import { createPreviewHandler } from '@uniformdev/canvas-next'
import getConfig from "next/config";
import { enhancers } from "lib/enhancers";

const handler = createPreviewHandler({
  secret: () => getConfig().serverRuntimeConfig.previewSecret,
  enhance: (composition) =>
    enhance({ composition, enhancers: enhancers, context: { preview: true } })
})

export default handler;