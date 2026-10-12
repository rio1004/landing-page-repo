# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Café demo product

Run `npm install` if dependencies are missing, then `npm run dev`.
Open `/b/juans-coffee` or `/b/fern-coffee`. `/` also previews Juan's Coffee.
`npm run build` runs strict TypeScript checking and the production build; `npm run lint` runs ESLint.

### Content and branding

Edit `src/data/businesses/juans-coffee.ts` or `fern-coffee.ts`. The shared contract lives in `src/types/business.ts`. Content flows from the business registry into the shared `src/templates/CafePage.tsx` template. CSS uses configured background, ink, accent, and soft colors. Keep text/background combinations readable.

To add a café, create a configuration implementing `BusinessConfig` with a unique stable slug, then import and register it in `src/data/businesses/index.ts`. Its route is `/b/<slug>`. Keep slugs unchanged after printing QR codes or issuing NFC tags. Store only public information in configurations.

Put photos in `public/images` and reference them as `/images/name.jpg`. Each image needs meaningful alt text. The page reserves image space, lazy-loads lower photos, and shows an illustration if an image is missing or fails. The current images are illustrative stock photos downloaded from Unsplash, not photographs of the fictional businesses.

Optional promotion, hours, address, gallery, and links may be omitted. Menu categories with no items are hidden. Add actual business destinations via `links.directions`, `links.phone` (international phone number), `links.socials` (`label`, `url`), and `links.review`. URL actions are hidden when missing; demo configurations deliberately contain no external destinations. Use verified HTTPS destinations for web links.

### Before delivery

Browser visual verification was unavailable in the development session. Manually check 375px phone, tablet, and desktop layouts; horizontal overflow; keyboard focus; View Menu; each category; direct navigation and refresh; unknown slugs; and actual configured contact destinations. Fern & Filter demonstrates missing promotion/gallery/links.

This is a client-rendered Vite app. The local Vite server supplies the application shell for business URLs; configure an equivalent SPA fallback when hosting. Unknown business pages currently display a useful client not-found screen rather than an HTTP 404. Per-business search/social HTML is not implemented; consider prerendering if required. No hosting configuration, deployment, QR creation, or physical NFC testing is included.

### Social profile links

Configure `links.socials` as an array of `{ platform, label, url }` entries. Supported icons: `facebook`, `instagram`, `tiktok`, `youtube`, `x`, `linkedin`, and `pinterest` (case-insensitive). Use `link` or any other platform name for the generic link icon.

Only absolute HTTP/HTTPS URLs with nonempty labels are rendered. Malformed URLs, relative URLs, other protocols, and URLs containing credentials are omitted. If no valid entries remain, the entire section is hidden. Links open a new tab with `noopener noreferrer`. These are profile navigation links; following, liking, and subscribing happen on the destination platform.

The fictional cafés have no real social profiles, so their social sections remain hidden until you supply verified client URLs. No unrelated profiles were added to the demos.

### Menu browsing modes

Each business can optionally set `menuDisplay` beside `menu`:

```ts
menuDisplay: { mode: 'vertical' }
menuDisplay: { mode: 'horizontal' }
menuDisplay: { mode: 'paginated', pageSize: 8 }
```

Use one of these entries. Omitted/invalid mode falls back to vertical. Invalid page sizes (including zero, negative numbers, fractions, and strings) fall back to 8; pageSize affects pagination only. Vertical categories stack with sticky jump navigation. Horizontal categories have native swipe/scroll rows with accessible controls. Paginated categories include All, reset on filter changes, and clamp the page when data or page size changes. Page-button clicks focus and reveal the results heading and announce the new page; initial rendering does not trigger scrolling.

All modes use `MenuItemCard` and preserve item ordering, prices, images, and badges. Optional `dietaryLabels: string[]`, `bestSeller: boolean`, and `available: boolean` provide dietary tags, a best-seller label, and an unavailable notice. Empty categories are hidden; an empty menu shows a helpful message.

Run `node scripts/check-menu.mjs` for menu configuration, rendering, content-preservation, and boundary checks. Browser QA checked all modes at 375px and 1440px, vertical sticky jumps, horizontal previous/next, pagination boundaries, category reset, focus, live-status text, and page overflow. Real-device swiping and screen-reader audio remain untested.

### Restaurant template

Open `/b/kusina-ni-juan`. Edit `src/data/businesses/kusina-ni-juan.ts` for menu categories/items, theme, logo initials, cover, promotion, hours, address, gallery, and links. Select `template: 'restaurant'`; existing configurations without a template retain the café template. Restaurants support all three `menuDisplay` modes and the same menu-item/social components.

Optional service links: `links.reservation`, `links.delivery`, `links.ordering`, `links.directions`, and `links.review` accept valid absolute HTTP/HTTPS URLs. Invalid or missing destinations are hidden, and valid external links open with `noopener noreferrer`. `links.phone` enables a telephone action; `links.email` enables an email action. `links.socials` uses the existing platform/label/url array. No real destinations are supplied for the fictional restaurant.

Use `image: { src: '/images/your-dish.jpg', alt: 'Meaningful description' }` on menu items. Add verified client photography under `public/images`; the current stock photos illustrate food/dining and are not the advertised dishes. Optional `allergens`, `dietaryLabels`, `bestSeller`, and `available` are supported. Demo dietary/allergen labels are unverified examples; replace them with client-provided information before delivery.
