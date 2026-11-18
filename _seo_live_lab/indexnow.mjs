const [origin, ...changedPaths] = process.argv.slice(2);
const key = process.env.INDEXNOW_KEY;
if (!origin || !changedPaths.length || !/^[a-zA-Z0-9-]{8,128}$/.test(key ?? '')) {
  throw new Error('Set INDEXNOW_KEY and supply the HTTPS canonical origin followed by changed paths.');
}

const site = new URL(origin);
if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash || site.username || site.password) {
  throw new Error('Supply the HTTPS canonical origin.');
}

const urlList = [...new Set(changedPaths.map((path) => {
  const url = new URL(path, site);
  if (!path.startsWith('/') || url.origin !== site.origin || url.hash || url.search) throw new Error('Invalid local path: ' + path);
  return url.href;
}))];
if (urlList.length > 10000) throw new Error('Submit at most 10000 URLs.');
const keyLocation = new URL('/' + key + '.txt', site).href;
const proof = await fetch(keyLocation, { redirect: 'error', signal: AbortSignal.timeout(10000) });
if (!proof.ok || (await proof.text()).trim() !== key) throw new Error('Publish the matching IndexNow key file on the canonical host.');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: site.host, key, keyLocation, urlList }),
  signal: AbortSignal.timeout(15000),
});
if (![200, 202].includes(response.status)) throw new Error('IndexNow HTTP ' + response.status);
console.log('IndexNow received ' + urlList.length + ' URLs (HTTP ' + response.status + ').');
