import type { BusinessConfig } from '../types/business';
import { socialDestination } from '../utils/socialLinks';
export default function BusinessActions({ links }: { links?: BusinessConfig['links'] }) {
  const actions = [
    { label: 'Get directions', url: links?.directions },
    { label: 'Reserve a table', url: links?.reservation },
    { label: 'Order online', url: links?.ordering },
    { label: 'Delivery', url: links?.delivery },
    { label: 'Leave a review', url: links?.review },
  ].flatMap(action => { const url = action.url ? socialDestination(action.url) : undefined; return url ? [{ ...action, url }] : []; });
  const phone = links?.phone?.trim();
  const validPhone = phone && /^\+?[\d\s()-]{5,25}$/.test(phone);
  const email = links?.email?.trim();
  const validEmail = email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);
  if (!actions.length && !validPhone && !validEmail) return null;
  return <div className="contact-actions">
    {actions.map(action => <a className="button" key={action.label} href={action.url} target="_blank" rel="noopener noreferrer">{action.label} ↗</a>)}
    {validPhone && <a className="button secondary" href={`tel:${phone.replace(/[\s()-]/g, '')}`}>Call {phone}</a>}
    {validEmail && <a className="button secondary" href={`mailto:${email}`}>Email us</a>}
  </div>;
}
