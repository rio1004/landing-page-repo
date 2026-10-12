import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import type { BusinessConfig } from '../types/business';
import Menu from '../components/Menu';
import { Photo } from '../components/Photo';
import SocialLinks from '../components/SocialLinks';
import BusinessActions from '../components/BusinessActions';
import { pesos } from '../utils/currency';
import { socialDestination } from '../utils/socialLinks';
export default function RestaurantPage({ business }: { business: BusinessConfig }) {
  useEffect(() => { document.title = `${business.name} — Demo restaurant`; }, [business.name]);
  const hasMenu = business.menu.some(category => category.items.length);
  const hasVisit = Boolean(business.hours?.length || business.address || [business.links?.directions, business.links?.reservation, business.links?.ordering, business.links?.delivery, business.links?.review].some(url => url && socialDestination(url)) || (business.links?.phone && /^\+?[\d\s()-]{5,25}$/.test(business.links.phone.trim())) || (business.links?.email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(business.links.email.trim())));
  const style = { '--cream': business.theme.background, '--ink': business.theme.ink, '--accent': business.theme.accent, '--soft': business.theme.soft } as CSSProperties;
  return <div className="cafe-page restaurant-page" style={style}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="demo-banner">FICTIONAL RESTAURANT DEMO · Content and photos are illustrative</div>
    <header className="header"><a className="brand" href="#main"><span className="logo">{business.logo}</span><span>{business.name}</span></a><nav aria-label="Main navigation">{hasMenu && <a href="#menu">Our menu</a>}{!!business.gallery?.length && <a href="#gallery">At the table</a>}{hasVisit && <a href="#visit">Visit us</a>}</nav>{hasMenu && <a className="button header-action" href="#menu">View Menu ↗</a>}</header>
    <main id="main">
      <section className="restaurant-hero"><div className="restaurant-hero-copy"><span className="eyebrow">FILIPINO FOOD · SHARED MOMENTS</span><h1>{business.headline.split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}</h1><p>{business.description}</p>{hasMenu && <a className="button" href="#menu">View Menu ↗</a>}<span className="restaurant-hero-note">Tara, kain tayo. <i>Let’s eat together.</i></span></div><div className="restaurant-cover"><Photo image={business.cover} eager /><span className="restaurant-photo-label">Food brings us together.</span></div></section>
      <div className="restaurant-ribbon">A little gathering. A generous plate. A moment to share.</div>
      <Menu menu={business.menu} display={business.menuDisplay} heading="Something for every appetite." subtitle="From the first bite to the last spoonful. Sample menu, priced in Philippine pesos." />
      <p className="restaurant-allergen-note">Dietary and allergen labels are fictional examples and have not been verified. For a real restaurant, ask staff about ingredients and cross-contact before ordering.</p>
      {business.promotion && <section className="promotion restaurant-special"><Photo image={business.promotion.image} /><div><span className="eyebrow">{business.promotion.eyebrow}</span><h2>{business.promotion.title}</h2><p>{business.promotion.description}</p>{business.promotion.price !== undefined && <span className="promo-price">{pesos(business.promotion.price)}</span>}{hasMenu && <a className="text-link" href="#menu">Find your favorites ↗</a>}</div></section>}
      {!!business.gallery?.length && <section id="gallery" className="section"><div className="section-heading"><span className="eyebrow">THE FOOD. THE SPACE. THE COMPANY.</span><h2>There’s room for you.</h2><p>Illustrative stock photography, not the fictional restaurant or its dishes.</p></div><div className="gallery restaurant-gallery">{business.gallery.map((image, index) => <Photo key={index} image={image} />)}</div></section>}
      {hasVisit && <section id="visit" className="section visit-section"><div><span className="eyebrow">PULL UP A CHAIR</span><h2>See you at the table.</h2>{business.address && <div className="address"><h3>Find us here</h3><p>{business.address}</p></div>}<BusinessActions links={business.links} /><p className="demo-detail">Fictional demo location. Contact, reservation, delivery, and ordering links appear only when configured with valid destinations.</p></div>{!!business.hours?.length && <div className="hours"><span className="eyebrow">LUNCH, DINNER & EVERYTHING BETWEEN</span><h3>Opening hours</h3>{business.hours.map(row => <div key={row.days}><span>{row.days}</span><strong>{row.time}</strong></div>)}<p>Fictional sample hours.</p></div>}</section>}
      <SocialLinks links={business.links?.socials} businessName={business.name} />
    </main>
    <footer><div className="footer-top"><a className="brand" href="#main"><span className="logo">{business.logo}</span><span>{business.name}</span></a><a href="#main">Back to top ↑</a></div><div className="footer-bottom"><span>Made for shared moments. · Fictional restaurant demo</span><a href="/b/juans-coffee">Explore the café demo ↗</a></div></footer>
  </div>;
}

