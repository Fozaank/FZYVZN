import type { MiddlewareHandler } from "astro";
import { parse } from "cookie";

const middleware: MiddlewareHandler = async ({ request, locals }, next) => {
  const url = new URL(request.url);
  const cookies = parse(request.headers.get("cookie") || "");
  const isAuthenticated = cookies.site_auth === "authenticated";

  // Allow access to the password page, but block all others
  if (!isAuthenticated && url.pathname !== "/password") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/password" },
    });
  }

  return next();
};

// ✅ Correctly export the middleware in Astro
export const onRequest: MiddlewareHandler = middleware;
