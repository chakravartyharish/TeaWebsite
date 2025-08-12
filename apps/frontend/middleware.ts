import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl
  
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/landing", "/showcase", "/faq", "/terms", "/privacy", "/contact", "/sign-in", "/sign-up"]
  
  // Protected routes that require authentication  
  const protectedPrefixes = ["/cart", "/checkout", "/products"]
  
  // Check if current path should be protected
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/api/") || pathname.startsWith("/_next")
  const shouldProtect = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))
  
  if (shouldProtect && !isPublicRoute) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}



