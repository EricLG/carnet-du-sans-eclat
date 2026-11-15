import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkSourceLinks } from '../src/catalog/sourceLinks';

test('les contrôles HTTP distinguent accessibilité, absence confirmée et refus non vérifiable', async () => {
  const methods: Record<string, string[]> = {};
  const request: typeof fetch = async (input, options) => {
    const url = String(input), method = options?.method ?? 'GET';
    methods[url] = [...(methods[url] ?? []), method];
    if (url.endsWith('timeout')) throw new Error('Délai dépassé');
    if (url.endsWith('head-refused')) return new Response(null, { status: method === 'HEAD' ? 405 : 200 });
    if (url.endsWith('false-missing')) return new Response(null, { status: method === 'HEAD' ? 404 : 200 });
    return new Response(null, { status: url.endsWith('missing') ? 404 : url.endsWith('blocked') ? 403 : url.endsWith('temporary') ? 503 : 200 });
  };
  const names = ['ok', 'missing', 'blocked', 'temporary', 'timeout', 'head-refused', 'false-missing'];
  const results = await checkSourceLinks([...names, 'ok'].map(name => `https://example.org/${name}`), request);
  assert.equal(results.length, names.length);
  assert.deepEqual(results.map(result => result.status), ['available', 'broken', 'unverified', 'unverified', 'unverified', 'available', 'available']);
  assert.deepEqual(methods['https://example.org/ok'], ['HEAD']);
  assert.deepEqual(methods['https://example.org/missing'], ['HEAD', 'GET']);
  assert.deepEqual(methods['https://example.org/blocked'], ['HEAD', 'GET']);
  assert.match(results.find(result => result.url.endsWith('timeout'))!.reason!, /Délai dépassé/);
});
