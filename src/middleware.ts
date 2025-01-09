// src/middleware.ts
import { parse } from "cookie";
import { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const cookies = parse(req.headers.cookie || "");
  const isAuthenticated = cookies.site_auth === "authenticated";

  if (!isAuthenticated && req.url !== "/password") {
    res.writeHead(302, { Location: "/password" });
    res.end();
    return;
  }

  // Continue with the request
}
