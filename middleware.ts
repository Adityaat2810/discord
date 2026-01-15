import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes:[
    '/api/uploadthing',
    "/landing",
  ],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL("/landing", req.url);
      return Response.redirect(url);
    }
  }
})


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};