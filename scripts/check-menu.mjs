import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Exercise the actual TS/TSX source without adding a test-runner dependency.
const require = createRequire(import.meta.url);
function loadSource(path, imports = {}) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    URL,
    require: (name) => imports[name] ?? require(name),
  });
  return exports;
}
const utils = loadSource("../src/utils/menu.ts");
const photo = loadSource("../src/components/Photo.tsx");
const currency = loadSource("../src/utils/currency.ts");
const card = loadSource("../src/components/MenuItemCard.tsx", {
  "./Photo": photo,
  "../utils/currency": currency,
});
const { default: Menu } = loadSource("../src/components/Menu.tsx", {
  "../utils/menu": utils,
  "./MenuItemCard": card,
});
const render = (menu, display) =>
  renderToStaticMarkup(React.createElement(Menu, { menu, display }));
const { normalizeMenuDisplay, menuResults } = utils;
for (const value of [
  undefined,
  null,
  false,
  "horizontal",
  {},
  { mode: "invalid" },
])
  assert.equal(normalizeMenuDisplay(value).mode, "vertical");
for (const value of [0, -1, 1.5, NaN, Infinity, "4", null])
  assert.equal(
    normalizeMenuDisplay({ mode: "paginated", pageSize: value }).pageSize,
    8,
  );
assert.equal(
  normalizeMenuDisplay({ mode: "paginated", pageSize: 3 }).pageSize,
  3,
);
const item = {
  name: "A very long coffee name ".repeat(8),
  description: "Long description ".repeat(30),
  price: 150,
  badge: "House favorite",
  dietaryLabels: ["Vegan"],
  bestSeller: true,
  available: false,
  image: { src: "/images/latte.jpg", alt: "Latte" },
};
const menu = [
  { id: "empty", name: "Hidden category", items: [] },
  {
    id: "coffee",
    name: "Coffee",
    items: Array.from({ length: 9 }, (_, index) => ({
      ...item,
      name: `Coffee ${index}`,
    })),
  },
  { id: "single", name: "Single", items: [{ ...item, name: "Single item" }] },
];
for (const mode of ["vertical", "horizontal", "paginated"]) {
  const html = render(menu, { mode, pageSize: 20 });
  assert.equal((html.match(/class="menu-card"/g) ?? []).length, 10);
  assert.ok(!html.includes("Hidden category"));
  assert.match(html, /Vegan/);
  assert.match(html, /Best seller/);
  assert.match(html, /Currently unavailable/);
  assert.match(html, /House favorite/);
  assert.match(html, /₱150/);
  assert.match(html, /alt="Latte"/);
  assert.ok(html.indexOf("Coffee 0") < html.indexOf("Coffee 8"));
  assert.match(render([], { mode }), /menu is being prepared/);
  const long = render(
    [{ id: "long", name: "Long category ".repeat(20), items: [item] }],
    { mode },
  );
  assert.match(long, /Long description/);
}
assert.match(render(menu), /sticky-categories/);
assert.match(render(menu, { mode: "horizontal" }), /Previous items in Coffee/);
assert.match(render(menu, { mode: "horizontal" }), /tabindex="0"/);
const paginated = render(menu, { mode: "paginated", pageSize: 3 });
assert.match(paginated, /Page 1 of 4/);
assert.match(paginated, /disabled="">Previous/);
assert.match(paginated, /role="status"/);
assert.equal((paginated.match(/class="menu-card"/g) ?? []).length, 3);
assert.ok(
  !render(menu, { mode: "paginated", pageSize: 20 }).includes(
    'aria-label="Menu pages"',
  ),
);
assert.equal(menuResults(menu, null, 100, 3).page, 4);
assert.equal(menuResults(menu, null, -1, 3).page, 1);
assert.equal(menuResults(menu, "coffee", 3, 3).items[2].item.name, "Coffee 8");
assert.equal(menuResults(menu, "single", 4, 3).page, 1);
assert.equal(menuResults(menu, "removed", 1, 3).totalItems, 10);
assert.equal(menuResults(menu, null, 4, 8).page, 2);
assert.equal(menuResults([], null, 4, 3).page, 1);
for (const file of ["juans-coffee", "fern-coffee"]) {
  const config = loadSource(`../src/data/businesses/${file}.ts`);
  const business = Object.values(config)[0];
  assert.match(render(business.menu, business.menuDisplay), /menu-card/);
}
console.log(
  "Menu checks passed: all modes, existing configs, item content/order, invalid settings, empty/single-item categories, long content, and pagination boundaries/data changes.",
);
