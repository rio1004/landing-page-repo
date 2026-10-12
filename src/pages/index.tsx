import { Link, useParams } from 'react-router';
import { businesses } from '../data/businesses';
import CafePage from '../templates/CafePage';
export function NotFound() { return <main className="not-found"><span className="eyebrow">A LITTLE DETOUR</span><h1>That café isn’t here.</h1><p>This business link may be incorrect. Try one of our fictional demo cafés.</p>{businesses.map(business => <Link className="button" key={business.slug} to={`/b/${business.slug}`}>{business.name} ↗</Link>)}</main>; }
export function BusinessPage() { const { slug } = useParams(); const business = businesses.find(b => b.slug === slug); return business ? <CafePage key={business.slug} business={business} /> : <NotFound />; }
export default function HomePage() { return <CafePage business={businesses[0]} />; }
