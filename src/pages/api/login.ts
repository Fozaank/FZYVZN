export async function POST({ request }) {
  const formData = await request.formData();
  const password = formData.get("password");

  const correctPassword = import.meta.env.SITE_PASSWORD;

  if (password === correctPassword) {
    const authCookie = `site_auth=authenticated; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`;

    console.log("✅ Setting Cookie:", authCookie); // Debugging

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": authCookie,
        Location: "/", // Redirect after login
      },
    });
  }

  return new Response(JSON.stringify({ error: "Invalid password" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
