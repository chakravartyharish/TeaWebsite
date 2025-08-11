import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl
  const protectedPrefixes = ["/", "/cart", "/checkout"]
  const shouldProtect = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))
  if (shouldProtect) auth().protect()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}



