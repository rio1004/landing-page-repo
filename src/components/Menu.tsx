import { useEffect, useId, useRef, useState } from "react";
import type { BusinessConfig } from "../types/business";
import { menuResults, normalizeMenuDisplay } from "../utils/menu";
import MenuItemCard from "./MenuItemCard";

type Category = BusinessConfig["menu"][number];
function HorizontalRow({ category }: { category: Category }) {
  const row = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: true });
  useEffect(() => {
    const element = row.current;
    if (!element) return;
    const update = () =>
      setEdges({
        start: element.scrollLeft <= 2,
        end:
          element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [category.items.length]);
  const move = (direction: number) =>
    row.current?.scrollBy({
      left: direction * row.current.clientWidth * 0.85,
      behavior: "auto",
    });
  return (
    <>
      <div className="row-controls">
        <span>
          {!edges.end
            ? "More items → Swipe or scroll to explore"
            : !edges.start
              ? "← Scroll back for more items"
              : "All items shown"}
        </span>
        <div>
          <button
            disabled={edges.start}
            aria-controls={id}
            aria-label={`Previous items in ${category.name}`}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            disabled={edges.end}
            aria-controls={id}
            aria-label={`Next items in ${category.name}`}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>
      <div
        id={id}
        className="menu-row"
        ref={row}
        tabIndex={0}
        role="region"
        aria-label={`${category.name} items; scroll horizontally`}
      >
        {category.items.map((item, index) => (
          <MenuItemCard
            key={index}
            item={item}
            categoryId={category.id}
            categoryName={category.name}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
function PaginatedMenu({
  menu,
  pageSize,
}: {
  menu: BusinessConfig["menu"];
  pageSize: number;
}) {
  const [selection, setSelection] = useState<{
    category: string | null;
    page: number;
  }>({ category: null, page: 1 });
  const [announcement, setAnnouncement] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const results = menuResults(
    menu,
    selection.category,
    selection.page,
    pageSize,
  );
  // Keep state aligned with derived boundaries without effects or initial scrolling.
  if (
    results.page !== selection.page ||
    (selection.category !== null &&
      !results.categories.some(
        (category) => category.id === selection.category,
      ))
  ) {
    setSelection({
      category: results.categories.some(
        (category) => category.id === selection.category,
      )
        ? selection.category
        : null,
      page: results.page,
    });
  }
  const changePage = (page: number) => {
    const next = menuResults(menu, selection.category, page, pageSize);
    setSelection({ ...selection, page: next.page });
    setAnnouncement(`${next.label}, page ${next.page} of ${next.totalPages}`);
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
  };
  return (
    <>
      <div
        className="category-nav"
        role="group"
        aria-label="Filter menu categories"
      >
        <button
          aria-pressed={selection.category === null}
          onClick={() => {
            setSelection({ category: null, page: 1 });
            setAnnouncement("All items, page 1");
          }}
        >
          All
        </button>
        {results.categories.map((category) => (
          <button
            key={category.id}
            aria-pressed={selection.category === category.id}
            onClick={() => {
              setSelection({ category: category.id, page: 1 });
              setAnnouncement(`${category.name}, page 1`);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <h3 ref={heading} tabIndex={-1} className="menu-results-heading">
        {results.label} <small>· {results.totalItems} items</small>
      </h3>
      <div className="menu-grid">
        {results.items.map(({ item, category, index }) => (
          <MenuItemCard
            key={`${category.id}-${index}`}
            item={item}
            categoryId={category.id}
            categoryName={category.name}
            index={index}
          />
        ))}
      </div>
      {results.totalPages > 1 && (
        <nav className="pagination" aria-label="Menu pages">
          <button
            disabled={results.page === 1}
            onClick={() => changePage(results.page - 1)}
          >
            Previous
          </button>
          <span>
            Page {results.page} of {results.totalPages}
          </span>
          <button
            disabled={results.page === results.totalPages}
            onClick={() => changePage(results.page + 1)}
          >
            Next
          </button>
        </nav>
      )}
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
    </>
  );
}
export default function Menu({
  menu,
  display,
  heading,
  subtitle,
}: {
  menu: BusinessConfig["menu"];
  display?: BusinessConfig["menuDisplay"];
  heading?: string;
  subtitle?: string;
}) {
  const categories = menu.filter((category) => category.items.length);
  const { mode, pageSize } = normalizeMenuDisplay(display);
  const prefix = useId();
  return (
    <section id="menu" className={`section menu-section menu-${mode}`}>
      <div className="section-heading">
        <span className="eyebrow">FIND YOUR USUAL</span>
        <h2>
          {heading ?? "GOOD COFFEE,"}
          <br />
          {!heading && "MADE SIMPLE."}
        </h2>
        <p>
          {subtitle ?? "Something warm. Something sweet. Something for you."}
        </p>
      </div>
      {!categories.length ? (
        <p className="empty-menu">
          The menu is being prepared. Please check back soon.
        </p>
      ) : mode === "paginated" ? (
        <PaginatedMenu menu={menu} pageSize={pageSize} />
      ) : (
        <>
          <nav
            className={`category-nav ${mode === "vertical" ? "sticky-categories" : ""}`}
            aria-label="Menu categories"
          >
            {categories.map((category, index) => (
              <a key={category.id} href={`#${prefix}-category-${index}`}>
                {category.name}
              </a>
            ))}
          </nav>
          {categories.map((category, index) => (
            <section
              className="menu-category"
              key={category.id}
              aria-labelledby={`${prefix}-heading-${index}`}
            >
              <h3
                id={`${prefix}-category-${index}`}
                className="menu-category-heading"
              >
                <span id={`${prefix}-heading-${index}`}>{category.name}</span>
              </h3>
              {mode === "horizontal" ? (
                <HorizontalRow category={category} />
              ) : (
                <div className="menu-grid">
                  {category.items.map((item, index) => (
                    <MenuItemCard
                      key={index}
                      item={item}
                      categoryId={category.id}
                      categoryName={category.name}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </>
      )}
      {!!categories.length && (
        <p className="menu-note">
          Demo prices in Philippine pesos · Photos are illustrative
        </p>
      )}
    </section>
  );
}
