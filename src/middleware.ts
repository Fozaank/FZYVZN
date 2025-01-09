import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
  { request, redirect },
  next,
) => {
  const cookies = request.headers.get("cookie") || "";
  const isAuthenticated = cookies.includes("site_auth=authenticated");

  const isVercelSession =
    process.env.VERCEL && process.env.VERCEL_ENV !== "production";

  // ✅ Allow access if authenticated or in a Vercel preview session
  if (isAuthenticated || isVercelSession) {
    return next();
  }

  // ✅ Prevent redirect loop on `/password`
  if (request.url.endsWith("/password")) {
    return next();
  }

  // 🚨 Redirect to `/password` if not authenticated
  return redirect("/password");
};
