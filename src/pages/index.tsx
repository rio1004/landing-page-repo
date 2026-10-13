import { Link, useParams } from "react-router";
import { businesses } from "../data/businesses";
import CafePage from "../templates/CafePage";
import RestaurantPage from "../templates/RestaurantPage";
export function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">A LITTLE DETOUR</span>
      <h1>That business is not here.</h1>
      <p>
        This business link may be incorrect. Try one of our fictional demo
        businesses.
      </p>
      {businesses.map((business) => (
        <Link className="button" key={business.slug} to={`/b/${business.slug}`}>
          {business.name} ↗
        </Link>
      ))}
    </main>
  );
}
export function BusinessPage() {
  const { slug } = useParams();
  const business = businesses.find((b) => b.slug === slug);
  return business ? (
    business.template === "restaurant" ? (
      <RestaurantPage key={business.slug} business={business} />
    ) : (
      <CafePage key={business.slug} business={business} />
    )
  ) : (
    <NotFound />
  );
}
export default function HomePage() {
  return <CafePage business={businesses[0]} />;
}
