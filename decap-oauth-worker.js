// Decap CMS GitHub OAuth proxy — deploy ONCE, free, then forget it.
// 1. github.com/settings/developers → OAuth Apps → New: callback = https://<this-worker>.workers.dev/callback
// 2. npx wrangler login && npx wrangler secret put GITHUB_CLIENT_ID && npx wrangler secret put GITHUB_CLIENT_SECRET
// 3. npx wrangler deploy decap-oauth-worker.js --name bitombang-oauth
// 4. Put the worker URL in public/admin/config.yml (base_url), commit, push.
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/auth') {
      const state = Math.random().toString(36).slice(2);
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: 'repo,user',
        state,
      });
      return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
    }
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await res.json();
      const msg = data.access_token
        ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`
        : `authorization:github:error:${JSON.stringify(data)}`;
      return new Response(
        `<script>window.opener.postMessage('${msg}', '*');window.close();</script>`,
        { headers: { 'Content-Type': 'text/html' } },
      );
    }
    return new Response('bitombang oauth proxy — use /auth', { status: 404 });
  },
};
