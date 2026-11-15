import type { Source } from '../../domain/catalog';

export const worldGuide = (label: string, slug: string): Source => ({
  label: `SuperSoluce — ${label}`, url: `https://www.supersoluce.com/soluce/elden-ring/${slug}`, verifiedAt: '2026-11-15',
});
export const graceListSource: Source = {
  label: 'PowerPyx — emplacements des sites de grâce',
  url: 'https://www.powerpyx.com/elden-ring-all-sites-of-grace-locations/', verifiedAt: '2026-11-15',
};
