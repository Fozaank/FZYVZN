import { serialize } from "cookie";

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const password = formData.get("password");
    const correctPassword = import.meta.env.SITE_PASSWORD; // Load from `.env`

    if (password === correctPassword) {
      const authCookie = serialize("site_auth", "authenticated", {
        path: "/", // ✅ Available site-wide
        httpOnly: true, // ✅ Prevent JS access for security
        secure: true, // ✅ Set to `true` for HTTPS (required on production)
        sameSite: "strict", // ✅ Prevent CSRF attacks
        maxAge: 60 * 60 * 24, // ✅ 1-day expiration
      });

      console.log("✅ Setting Cookie:", authCookie); // Debugging

      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": authCookie, // ✅ Store authentication cookie
          Location: "/", // ✅ Redirect to homepage after login
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
