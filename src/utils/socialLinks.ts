import type { SocialLink } from '../types/business';

/** Absolute HTTP(S) destinations only; credentials are never needed for profiles. */
export function socialDestination(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function validSocialLinks(links?: SocialLink[]) {
  return (links ?? []).flatMap(link => {
    const url = socialDestination(link.url);
    const label = link.label.trim();
    return url && label ? [{ ...link, label, url }] : [];
  });
}
