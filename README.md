# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
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
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs["recommended-typescript"],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

## Project Structure

```
Aeroplane/
├── package.json
├── README.md
├── back-end/
│   ├── package.json
│   ├── server.js
│   ├── controllers/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── adminProducts.js
│   │   ├── adminRoutes.js
│   │   └── userProducts.js
│   ├── scripts/
│   │   └── seed.js
│   └── utils/
│       └── cloudinary.js
└── front-end/
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── eslint.config.js
    ├── index.html
    ├── Dockerfile
    ├── docker-compose.yml
    ├── nginx.conf
    ├── public/
    │   ├── robots.txt
    │   ├── images/
    │   │   ├── about/
    │   │   ├── applications/
    │   │   ├── banners/
    │   │   ├── economy/
    │   │   ├── footer/
    │   │   ├── products/
    │   │   └── scenarios/
    │   │       ├── civil-logistics/
    │   │       ├── emergency-rescue/
    │   │       ├── forest-fire-prevention/
    │   │       └── industry-service/
    │   ├── locales/
    │   │   ├── de/ (German translations)
    │   │   │   ├── about.json
    │   │   │   ├── applications.json
    │   │   │   ├── common.partial.json
    │   │   │   ├── contact.json
    │   │   │   ├── economy.json
    │   │   │   ├── gallery.json
    │   │   │   ├── home.json
    │   │   │   ├── layout.json
    │   │   │   ├── products.json
    │   │   │   └── training.json
    │   │   ├── en/ (English translations)
    │   │   │   ├── about.json
    │   │   │   ├── application.json
    │   │   │   ├── applications.json
    │   │   │   ├── common.partial.json
    │   │   │   ├── contact.json
    │   │   │   ├── economy.json
    │   │   │   ├── gallery.json
    │   │   │   ├── home.json
    │   │   │   ├── layout.json
    │   │   │   ├── products.json
    │   │   │   ├── training.json
    │   │   │   └── translation.json
    │   │   └── es/ (Spanish translations)
    │   │       ├── about.json
    │   │       ├── applications.json
    │   │       ├── common.partial.json
    │   │       ├── contact.json
    │   │       ├── economy.json
    │   │       ├── gallery.json
    │   │       ├── home.json
    │   │       ├── layout.json
    │   │       ├── products.json
    │   │       └── training.json
    │   └── videos/
    └── src/
        ├── main.tsx
        ├── index.css
        ├── i18n.ts
        ├── App.tsx
        ├── App.reference.tsx
        ├── components/
        │   ├── Navbar.tsx
        │   ├── Footer.tsx
        │   ├── ErrorBoundary.tsx
        │   ├── CookieConsent.tsx
        │   ├── IntroAnimation.tsx
        │   ├── MediaCenter.tsx
        │   ├── NewsSection.tsx
        │   ├── ProtectedAdminRoute.tsx
        │   ├── about/
        │   ├── application/
        │   ├── economy/
        │   ├── home/
        │   ├── products/
        │   └── training/
        ├── pages/
        │   ├── Home.tsx
        │   ├── About.tsx
        │   ├── ApplicationsPage.tsx
        │   ├── ContactPage.tsx
        │   ├── ProductsPage.tsx
        │   ├── ProductDetail.tsx
        │   ├── ScenarioDetail.tsx
        │   ├── LowAltitudeEconomy.tsx
        │   ├── TrainingCenter.tsx
        │   ├── NewsPage.tsx
        │   ├── AdminLogin.tsx
        │   ├── AdminDashboard.tsx
        │   ├── AdminProducts.tsx
        │   └── NotFound.tsx
        ├── hooks/
        │   ├── useAdminAuth.tsx
        │   ├── useProducts.ts
        │   ├── useCookieConsent.ts
        │   └── useSEO.ts
        ├── data/
        │   ├── product.ts
        │   ├── scenarios.ts
        │   └── news.ts
        └── utils/
```
