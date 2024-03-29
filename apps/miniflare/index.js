export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    url.port = "3200";

    if (url.pathname === "/_next/webpack-hmr") {
      const response = await fetch(url.toString(), {
        headers: { Upgrade: "websocket" },
      });
      return new Response(null, {
        status: 101,
        webSocket: response.webSocket,
      });
    }

    const headers = new Headers(request.headers);
    headers.delete("accept-encoding");
    let response = await fetch(url, { headers });

    return new Response(response.body, response);
  },
};
