import type { SocialLink } from '../types/business';
import { validSocialLinks } from '../utils/socialLinks';

function SocialIcon({ platform }: { platform: string }) {
  const common = { 'aria-hidden': true as const, focusable: false, viewBox: '0 0 24 24', width: 24, height: 24 };
  switch (platform.trim().toLowerCase()) {
    case 'facebook':
      return <svg {...common} fill="currentColor"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5c-.7-.1-1.8-.3-3-.3-3 0-5 1.9-5 5.3V9H7v4h3v9z" /></svg>;
    case 'instagram':
      return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
    case 'tiktok':
      return <svg {...common} fill="currentColor"><path d="M14 2h3c.4 3 2 4.6 5 5v3c-2-.1-3.6-.8-5-2v8a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3z" /></svg>;
    case 'youtube':
      return <svg {...common} fill="currentColor"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 6 3-6 3z" fill="var(--cream)" /></svg>;
    case 'x':
      return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 3 16 18h-5L3 3h5l13 18M20 3 4 21" /></svg>;
    case 'linkedin':
      return <svg {...common} fill="currentColor"><circle cx="5" cy="5" r="2" /><path d="M3 9h4v12H3zm7 0h4v1.5C15 9 16 8.7 17.5 8.7c3 0 3.5 2 3.5 5V21h-4v-7c0-1.5-.3-2.3-1.5-2.3S14 12.5 14 14v7h-4z" /></svg>;
    case 'pinterest':
      return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="11" r="9" /><path d="m8 22 4-15m-3 6c-3-5 2-8 5-6 4 3 0 10-3 7" /></svg>;
    default:
      return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m10 14 4-4m-5 6-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 0 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" /></svg>;
  }
}

export default function SocialLinks({ links, businessName }: { links?: SocialLink[]; businessName: string }) {
  const profiles = validSocialLinks(links);
  if (!profiles.length) return null;

  return (
    <section className="section social-section" aria-labelledby="social-heading">
      <div>
        <span className="eyebrow">KEEP IN TOUCH</span>
        <h2 id="social-heading">FIND US ONLINE.</h2>
        <p>Visit {businessName}’s profiles. Follow, like, or subscribe on the platform itself.</p>
      </div>
      <ul className="social-links">
        {profiles.map((profile, index) => (
          <li key={`${profile.platform}-${profile.url}-${index}`}>
            <a href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`${profile.label} — ${businessName} (opens in a new tab)`}>
              <SocialIcon platform={profile.platform} />
              <span>{profile.label}</span>
              <span className="social-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
