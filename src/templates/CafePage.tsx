import { useEffect } from "react";
import Menu from "../components/Menu";
import type { CSSProperties } from "react";
import type { BusinessConfig } from "../types/business";
import { Photo } from "../components/Photo";
import { pesos } from "../utils/currency";
import { Link } from "react-router";
import { businesses } from "../data/businesses";
import SocialLinks from "../components/SocialLinks";
function Visit({ business }: { business: BusinessConfig }) {
  const { hours, address, links } = business;
  if (
    !hours?.length &&
    !address &&
    !links?.directions &&
    !links?.phone &&
    !links?.review
  )
    return null;
  return (
    <section id="visit" className="section visit-section">
      <div>
        <span className="eyebrow">YOUR NEXT LITTLE PAUSE</span>
        <h2>
          COME IN.
          <br />
          STAY A WHILE.
        </h2>
        <p>Find a corner. Bring a friend. Make yourself at home.</p>
        {address && (
          <div className="address">
            <h3>Find us here</h3>
            <p>{address}</p>
          </div>
        )}
        <div className="contact-actions">
          {links?.directions && (
            <a
              className="button"
              href={links.directions}
              target="_blank"
              rel="noreferrer"
            >
              Get directions ↗
            </a>
          )}
          {links?.phone && (
            <a className="button secondary" href={`tel:${links.phone}`}>
              Call us ↗
            </a>
          )}
          {links?.review && (
            <a href={links.review} target="_blank" rel="noreferrer">
              Leave a review ↗
            </a>
          )}
        </div>
        <p className="demo-detail">
          Fictional location. Contact, directions, social, and review actions
          appear when real destinations are configured.
        </p>
      </div>
      {!!hours?.length && (
        <div className="hours">
          <span className="eyebrow">MAKE TIME FOR A CUP</span>
          <h3>Opening hours</h3>
          {hours.map((row) => (
            <div key={row.days}>
              <span>{row.days}</span>
              <strong>{row.time}</strong>
            </div>
          ))}
          <p>Sample hours for this demo café.</p>
        </div>
      )}
    </section>
  );
}
export default function CafePage({ business }: { business: BusinessConfig }) {
  useEffect(() => {
    document.title = `${business.name} — Demo café`;
  }, [business.name]);
  const hasMenu = business.menu.some((category) => category.items.length);
  const hasVisit = Boolean(
    business.hours?.length ||
    business.address ||
    business.links?.directions ||
    business.links?.phone ||
    business.links?.review,
  );
  const otherBusiness = businesses.find(
    (candidate) => candidate.slug !== business.slug,
  );
  const style = {
    "--cream": business.theme.background,
    "--ink": business.theme.ink,
    "--accent": business.theme.accent,
    "--soft": business.theme.soft,
  } as CSSProperties;
  return (
    <div className="cafe-page" style={style}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-banner">
        FICTIONAL CAFÉ DEMO <span>·</span> A preview of your next business page
      </div>
      <header className="header">
        <a className="brand" href="#">
          <span className="logo">{business.logo}</span>
          <span>{business.name}</span>
        </a>
        <nav aria-label="Main navigation">
          {hasMenu && <a href="#menu">Menu</a>}
          {!!business.gallery?.length && <a href="#gallery">The space</a>}
          {hasVisit && <a href="#visit">Visit us</a>}
        </nav>
        {hasMenu && (
          <a className="button header-action" href="#menu">
            View menu <span>↗</span>
          </a>
        )}
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">YOUR DAILY DOSE OF A GOOD DAY</span>
            <h1>
              {business.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
            <p>{business.description}</p>
            {hasMenu && (
              <a className="button" href="#menu">
                View Menu <span>↗</span>
              </a>
            )}
            <div className="hero-footnote">
              <span className="tiny-sun">✳</span>
              <span>
                Take a break.
                <br />
                You’ve earned it.
              </span>
            </div>
          </div>
          <div className="hero-image">
            <Photo key={business.cover?.src} image={business.cover} eager />
            <div className="round-stamp">
              A LITTLE
              <br />
              <b>COFFEE</b>
              <br />A LOT OF JOY
            </div>
            <span className="image-caption">A slower kind of everyday.</span>
          </div>
        </section>
        <div className="marquee" aria-hidden="true">
          <span>GOOD COFFEE</span>
          <i>✳</i>
          <span>WARM WELCOMES</span>
          <i>✳</i>
          <span>SMALL JOYS</span>
          <i>✳</i>
          <span>TAKE A MOMENT</span>
        </div>
        <Menu menu={business.menu} display={business.menuDisplay} />
        {business.promotion && (
          <section className="promotion">
            <Photo image={business.promotion.image} />
            <div>
              <span className="eyebrow">{business.promotion.eyebrow}</span>
              <h2>{business.promotion.title}</h2>
              <p>{business.promotion.description}</p>
              {business.promotion.price !== undefined && (
                <span className="promo-price">
                  {pesos(business.promotion.price)} <small>/ the pair</small>
                </span>
              )}
              {hasMenu && (
                <a className="text-link" href="#menu">
                  Explore the menu ↗
                </a>
              )}
            </div>
          </section>
        )}
        {!!business.gallery?.length && (
          <section id="gallery" className="section gallery-section">
            <div className="section-heading">
              <span className="eyebrow">A GLIMPSE OF THE GOOD LIFE</span>
              <h2>A SPACE TO SLOW DOWN.</h2>
              <p>Pull up a chair. There’s always room for a little pause.</p>
            </div>
            <div className="gallery">
              {business.gallery.map((image) => (
                <Photo key={image.src} image={image} />
              ))}
            </div>
            <p className="menu-note">
              Stock imagery for illustration · Not a real café location
            </p>
          </section>
        )}
        <Visit business={business} />
        <SocialLinks
          links={business.links?.socials}
          businessName={business.name}
        />
      </main>
      <footer>
        <div className="footer-top">
          <a className="brand" href="#">
            <span className="logo">{business.logo}</span>
            <span>{business.name}</span>
          </a>
          <a href="#main">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>Made for your everyday moments. · Fictional demo</span>
          <>
            {otherBusiness && (
              <Link to={`/b/${otherBusiness.slug}`}>
                Explore another café demo ↗
              </Link>
            )}
          </>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          {business.name}
        </div>
      </footer>
    </div>
  );
}
