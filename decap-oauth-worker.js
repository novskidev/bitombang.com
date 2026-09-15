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
      const status = data.access_token ? 'success' : 'error';
      const payload = data.access_token
        ? JSON.stringify({ token: data.access_token, provider: 'github' })
        : JSON.stringify(data);
      // Decap butuh handshake: popup nunggu parent "siap" (message apa pun) baru kirim token asli,
      // baru window ditutup. Kirim langsung tanpa nunggu bikin Decap nggak sempat nangkep pesannya.
      return new Response(
        `<script>
          (function () {
            function receiveMessage(e) {
              window.opener.postMessage('authorization:github:${status}:${payload}', e.origin);
              window.removeEventListener('message', receiveMessage, false);
              window.close();
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>`,
        { headers: { 'Content-Type': 'text/html' } },
      );
    }
    return new Response('bitombang oauth proxy — use /auth', { status: 404 });
  },
};
