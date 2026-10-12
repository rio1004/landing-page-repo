import { Photo } from "./Photo";
import { pesos } from "../utils/currency";
import type { MenuItem } from "../types/business";
export default function MenuItemCard({
  item,
  categoryId,
  categoryName,
  index,
}: {
  item: MenuItem;
  categoryId: string;
  categoryName: string;
  index: number;
}) {
  return (
    <article className="menu-card">
      {item.image ? (
        <Photo key={item.image.src} image={item.image} className="menu-photo" />
      ) : (
        <div className="drink-art" aria-hidden="true">
          <span>{categoryId === "bites" ? "◒" : "☕"}</span>
          <small>
            {String(index + 1).padStart(2, "0")} / {categoryName}
          </small>
        </div>
      )}
      <div className="menu-copy">
        {item.badge && <span className="item-badge">{item.badge}</span>}
        {item.bestSeller && <span className="item-badge">Best seller</span>}
        <div className="item-title">
          <h4>{item.name}</h4>
          <span>{pesos(item.price)}</span>
        </div>
        {item.description && <p>{item.description}</p>}
        {!!item.dietaryLabels?.length && (
          <ul className="dietary-labels" aria-label="Dietary information">
            {item.dietaryLabels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        )}
        {item.available === false && (
          <p className="availability">Currently unavailable</p>
        )}
      </div>
    </article>
  );
}
