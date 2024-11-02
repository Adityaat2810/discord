import { createRouteHandler } from "uploadthing/next";
export const runtime = 'experimental-edge'

import { ourFileRouter } from "./core";
 
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
});