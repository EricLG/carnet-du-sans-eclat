export type SourceLinkResult = {
  url: string; status: 'available' | 'broken' | 'unverified'; httpStatus?: number; resolvedUrl?: string; reason?: string;
};

// Outil de maintenance uniquement. Un accès HTTP réussi ne vérifie pas le contenu du guide.
export async function checkSourceLinks(urls: string[], request: typeof fetch = fetch): Promise<SourceLinkResult[]> {
  const unique = [...new Set(urls)];
  const results: SourceLinkResult[] = new Array(unique.length);
  let next = 0;
  async function worker() {
    while (next < unique.length) {
      const index = next++, url = unique[index];
      try {
        let response = await request(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
        await response.body?.cancel();
        // Confirmer les absences et les refus HEAD avec une seule requête GET.
        if ([403, 404, 405, 410, 501].includes(response.status)) {
          response = await request(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000) });
          await response.body?.cancel();
        }
        const status = response.status >= 200 && response.status < 300 ? 'available' : [404, 410].includes(response.status) ? 'broken' : 'unverified';
        results[index] = { url, status, httpStatus: response.status, resolvedUrl: response.url || url };
      } catch (error) {
        results[index] = { url, status: 'unverified', reason: error instanceof Error ? `${error.message}${error.cause instanceof Error ? ` : ${error.cause.message}` : ''}` : String(error) };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(3, unique.length) }, worker));
  return results;
}
