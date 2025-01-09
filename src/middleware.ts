import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
  { request, redirect },
  next,
) => {
  const cookies = request.headers.get("cookie") || "";
  const isAuthenticated = cookies.includes("site_auth=authenticated");

  // Detect if user is in a Vercel preview or development session
  const isVercelSession =
    process.env.VERCEL && process.env.VERCEL_ENV !== "production";

  // ✅ Allow authenticated users or Vercel preview users
  if (isAuthenticated || isVercelSession) {
    return next(); // ✅ Continue request
  }

  // ✅ Prevent redirect loop if already on `/password`
  if (request.url.endsWith("/password")) {
    return next(); // ✅ Let the user access the password page
  }

  // 🚨 Otherwise, redirect to `/password`
  return redirect("/password");
};
