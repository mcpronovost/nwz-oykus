# Frontend Router Service

The frontend router service is a **custom React-based routing solution** that provides client-side navigation without using external libraries like `react-router-dom`. It offers multilingual routing, dynamic routes, and seamless browser history integration.

## Core Architecture

### 1. Router Provider (`frontend/src/services/router/index.jsx`)

The `RouterProvider` is the central component that manages routing state using React Context:

- **State Management**: Manages browser history, current language, and active route
- **Navigation**: Handles programmatic navigation and URL updates
- **Browser Integration**: Syncs with browser history and handles back/forward buttons
- **Language Management**: Automatically updates document language attribute

**Key Features:**
- Uses `window.history.pushState()` for navigation
- Handles `popstate` events for browser back/forward
- Maintains navigation history array
- Provides fallback to 404 for invalid routes

### 2. Route Configuration (`frontend/src/services/router/routes/`)

Routes are defined as JavaScript objects with multilingual paths:

```javascript
{
  name: "login",
  component: React.lazy(() => import("../../../pages/Auth/Login")),
  paths: {
    fr: "connexion",
    en: "login",
  },
}
```

**Features:**
- **Code Splitting**: Uses `React.lazy()` for dynamic imports
- **Multilingual Paths**: Separate path definitions for each language
- **Nested Routes**: Supports hierarchical route structures with children
- **Dynamic Segments**: Parameterized routes like `{worldSlug}`

### 3. Utility Functions (`frontend/src/services/router/utils.jsx`)

Core utility functions for route management:

- **`getLangFromPath(pathname)`**: Extracts language from URL path
- **`findRoute(pathname, language)`**: Matches URL to route configuration
- **`buildRoutePath(name, params, language)`**: Builds URL paths with parameters
- **Dynamic Segment Matching**: Handles parameterized routes like `{worldSlug}`

## Key Features

### Multilingual Routing

- **Language Prefix**: URLs include language prefix: `/fr/connexion`, `/en/login`
- **Automatic Detection**: Language detected from URL path
- **Fallback Language**: Defaults to configured default language
- **Document Language**: Automatically updates `document.documentElement.lang`

### Dynamic Routes

Supports parameterized routes with dynamic segments:

```javascript
// Route definition
{
  name: "world-rulebook",
  paths: {
    fr: "reglement",
    en: "rulebook",
  },
}

// Usage
n("world-rulebook", { worldSlug: "fantasy" }, "en");
// Results in: /en/w/fantasy/rulebook
```

### Nested Routes

Supports complex hierarchical navigation:

```javascript
{
  name: "w",
  children: [
    {
      name: "world-home",
      paths: { fr: "{worldSlug}", en: "{worldSlug}" },
      children: [
        {
          name: "world-rulebook",
          paths: { fr: "reglement", en: "rulebook" },
        }
      ]
    }
  ]
}
```

### Browser History Integration

- **Push State**: Uses `window.history.pushState()` for navigation
- **Pop State**: Handles browser back/forward buttons
- **History Tracking**: Maintains array of visited paths
- **URL Synchronization**: Keeps URL in sync with application state

## Usage Patterns

### Navigation Hook

```javascript
import { useRouter } from "@/services/router";

function MyComponent() {
  const { n, route, lang, history } = useRouter();
  
  // Navigate to a route
  n("login", "fr");
  
  // Navigate with parameters
  n("world-rulebook", { worldSlug: "fantasy" }, "en");
  
  // Access current route info
  console.log(route.name, lang, history);
}
```

### Route Access

```javascript
const { route, lang, history } = useRouter();

// route.component - React component to render
// route.name - Current route name
// lang - Current language (fr/en)
// history - Array of visited paths
```

## Reusable Components

### Link Component (`frontend/src/components/common/Link.jsx`)

A reusable navigation component that integrates with the router service:

```javascript
import { OykLink } from "@/components/common";

// Basic usage
<OykLink routeName="login">Login</OykLink>

// With parameters
<OykLink routeName="world-rulebook" params={{ worldSlug: "fantasy" }}>
  View Rulebook
</OykLink>

// With custom props
<OykLink 
  routeName="about" 
  className="custom-link"
  disabled={false}
>
  About Us
</OykLink>
```

**Features:**
- **Route-based Navigation**: Uses route names instead of hardcoded URLs
- **Parameter Support**: Passes parameters to build dynamic URLs
- **Disabled State**: Supports disabled state for conditional navigation
- **Accessibility**: Maintains proper `href` attributes for screen readers
- **Event Prevention**: Prevents default link behavior and uses router navigation

**Props:**
- `routeName` (string): Name of the route to navigate to
- `params` (object): Route parameters for dynamic segments
- `disabled` (boolean): Whether the link is disabled
- `children` (ReactNode): Link content
- `...props`: Additional HTML anchor attributes

### Integration Examples

**Navigation Items:**
```javascript
// In AppSidebar/NavItem.jsx
<OykLink routeName={href} params={params} className="nav-link" disabled={disabled}>
  <IconComponent size={18} />
  <span>{text}</span>
</OykLink>
```

**Menu Links:**
```javascript
// In AppBar/Menu.jsx
<OykLink routeName="about" className="menu-link">
  {t("About")}
</OykLink>
```

## Route Structure

### Main Routes (`frontend/src/services/router/routes/index.jsx`)

```javascript
export const ROUTES = [
  {
    name: "home",
    component: React.lazy(() => import("../../../pages/Home")),
    paths: { fr: "", en: "" },
  },
  {
    name: "login",
    component: React.lazy(() => import("../../../pages/Auth/Login")),
    paths: { fr: "connexion", en: "login" },
  },
  {
    name: "register",
    component: React.lazy(() => import("../../../pages/Auth/Register")),
    paths: { fr: "inscription", en: "register" },
  },
  // ... more routes
];
```

### World Routes (`frontend/src/services/router/routes/world.jsx`)

```javascript
export const WORLD_ROUTES = [
  {
    name: "w",
    component: React.lazy(() => import("../../../pages/Home")),
    paths: { fr: "w", en: "w" },
    children: [
      {
        name: "world-home",
        paths: { fr: "{worldSlug}", en: "{worldSlug}" },
        children: [
          {
            name: "world-rulebook",
            component: React.lazy(() => import("../../../pages/Worlds/Rulebook")),
            paths: { fr: "reglement", en: "rulebook" },
          },
        ],
      },
    ],
  },
];
```

## Integration with App

### Provider Setup (`frontend/src/components/Providers.jsx`)

```javascript
export default function Providers({ children, lang = DEFAULT_LANG }) {
  return (
    <StoreProvider>
      <RouterProvider>
        <TranslationProvider lang={lang}>{children}</TranslationProvider>
      </RouterProvider>
    </StoreProvider>
  );
}
```

### App Component (`frontend/src/App.jsx`)

```javascript
function MainLayout() {
  const { route } = useRouter();
  
  return (
    <main id="oyk-app-main">
      {(route && route.component) ? (
        <React.Suspense fallback={<AppLoading />}>
          {React.createElement(route.component)}
        </React.Suspense>
      ) : (
        <AppNotFound />
      )}
    </main>
  );
}
```

## Error Handling

- **404 Fallback**: Invalid routes automatically redirect to 404 page
- **Route Not Found**: Navigation to non-existent routes shows 404
- **Context Error**: Missing router context triggers page reload
- **Component Loading**: Uses `React.Suspense` for lazy-loaded components

## Benefits

1. **No External Dependencies**: Self-contained routing solution
2. **Multilingual Support**: Built-in internationalization
3. **Type Safety**: JavaScript-based with clear structure
4. **Code Splitting**: Automatic lazy loading of route components
5. **SEO Friendly**: Proper URL structure with language prefixes
6. **Accessibility**: Maintains proper HTML semantics
7. **Performance**: Efficient route matching and navigation
