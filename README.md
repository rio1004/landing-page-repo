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
