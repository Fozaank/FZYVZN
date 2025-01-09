import { serialize } from "cookie";

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const password = formData.get("password");
    const correctPassword = import.meta.env.SITE_PASSWORD; // From .env

    if (password === correctPassword) {
      const authCookie = serialize("site_auth", "authenticated", {
        path: "/",
        httpOnly: false, // ✅ Ensure browser can access the cookie
        secure: false, // ✅ Set to `true` in production (HTTPS required)
        sameSite: "lax", // ✅ Allows authentication across subdomains
        maxAge: 60 * 60 * 24, // 1 day
      });

      console.log("✅ Sending Set-Cookie:", authCookie); // Debugging

      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": authCookie,
          Location: "/", // ✅ Redirect after login
        },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in login handler:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
