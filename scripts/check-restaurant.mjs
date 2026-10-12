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
const utils = loadSource('../src/utils/socialLinks.ts');
const actionModule = loadSource('../src/components/BusinessActions.tsx', { '../utils/socialLinks': utils });
const renderActions = links => renderToStaticMarkup(React.createElement(actionModule.default, { links }));
assert.equal(renderActions(undefined), ''); assert.equal(renderActions({}), '');
assert.equal(renderActions({ reservation: 'javascript:alert(1)', directions: '/invalid', ordering: 'ftp://example.com' }), '');
const actions = renderActions({ directions: 'https://example.com/map', reservation: 'https://example.com/table', ordering: 'http://example.com/order', delivery: 'https://example.com/delivery', review: 'https://example.com/review', phone: '+63 900 000 0000', email: 'client@example.com' });
assert.equal((actions.match(/rel="noopener noreferrer"/g) ?? []).length, 5);
assert.match(actions, /tel:\+639000000000/); assert.match(actions, /mailto:client@example.com/);
const photo = loadSource('../src/components/Photo.tsx');
const currency = loadSource('../src/utils/currency.ts');
const card = loadSource('../src/components/MenuItemCard.tsx', { './Photo': photo, '../utils/currency': currency });
const menuUtils = loadSource('../src/utils/menu.ts');
const menu = loadSource('../src/components/Menu.tsx', { '../utils/menu': menuUtils, './MenuItemCard': card });
const socials = loadSource('../src/components/SocialLinks.tsx', { '../utils/socialLinks': utils });
const { default: Restaurant } = loadSource('../src/templates/RestaurantPage.tsx', { '../components/Menu': menu, '../components/Photo': photo, '../components/SocialLinks': socials, '../components/BusinessActions': actionModule, '../utils/currency': currency, '../utils/socialLinks': utils });
const { kusinaNiJuan } = loadSource('../src/data/businesses/kusina-ni-juan.ts');
const render = business => renderToStaticMarkup(React.createElement(Restaurant, { business }));
const html = render(kusinaNiJuan);
assert.equal((html.match(/class="menu-card"/g) ?? []).length, 11);
for (const text of ['Starters', 'Main Dishes', 'Sharing Platters', 'Desserts', 'Drinks', 'Sample allergens:', 'Currently unavailable', 'Best seller', 'FICTIONAL RESTAURANT DEMO']) assert.ok(html.includes(text), text);
assert.ok(!html.includes('Reserve a table'));
const minimal = render({ ...kusinaNiJuan, menu: [], hours: undefined, address: undefined, promotion: undefined, gallery: undefined, links: {} });
assert.ok(!minimal.includes('id="visit"')); assert.ok(!minimal.includes('id="gallery"')); assert.ok(!minimal.includes('social-heading')); assert.match(minimal, /menu is being prepared/);
for (const mode of ['vertical', 'horizontal', 'paginated']) assert.match(render({ ...kusinaNiJuan, menuDisplay: { mode, pageSize: 3 } }), new RegExp(`menu-${mode}`));
console.log('Restaurant checks passed: categories, labels, all menu modes, optional sections, and valid/invalid external and contact links.');