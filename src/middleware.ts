import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
  { request, locals, redirect },
  next,
) => {
  const cookies = request.headers.get("cookie") || "";
  const isAuthenticated = cookies.includes("site_auth=authenticated");

  // ✅ Automatically bypass password if logged into Vercel (for admins)
  const adminBypassEmail = process.env.VERCEL_ADMIN_BYPASS;
  const vercelSession =
    request.headers.get("x-vercel-deployment-url") && adminBypassEmail;

  // ✅ Allow access if authenticated or admin session detected
  if (isAuthenticated || vercelSession) {
    return next();
  }

  // ✅ Let users access the password page
  if (request.url.endsWith("/password")) {
    return next();
  }

  // 🔴 Redirect to `/password` if not authenticated
  return redirect("/password");
};
