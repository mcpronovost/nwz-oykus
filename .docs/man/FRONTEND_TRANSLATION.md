# Frontend Translation Service

The frontend translation service is a **custom React-based internationalization solution** that provides multilingual support throughout the application. It integrates seamlessly with the router service to handle language switching and offers pluralization support using the `Intl.PluralRules` API.

## Core Architecture

### 1. Translation Provider (`frontend/src/services/translation/index.jsx`)

The `TranslationProvider` is the central component that manages translation state using React Context:

- **State Management**: Manages current language and translation data
- **Dynamic Loading**: Loads translation files based on current language
- **Pluralization**: Handles plural forms using `Intl.PluralRules`
- **Fallback Handling**: Provides graceful fallbacks for missing translations

**Key Features:**
- Uses React Context for global translation state
- Supports dynamic language switching
- Handles pluralization rules for different languages
- Provides fallback to translation key if translation is missing
- Uses `useRef` for efficient translation caching

### 2. Translation Utilities (`frontend/src/services/translation/utils.jsx`)

Core utility functions for translation management:

- **`DEFAULT_LANG`**: Default language constant (set to "fr")
- **`getTranslationFiles(lang)`**: Dynamically loads translation files for a language
- **`loadTranslations(lang)`**: Merges all translation files for a language

**Features:**
- **Dynamic Imports**: Uses Vite's `import.meta.glob` for code splitting
- **File Merging**: Combines multiple translation files per language
- **Error Handling**: Graceful fallback if translation files fail to load
- **Eager Loading**: Loads translation files immediately for better performance

### 3. Translation Files (`frontend/src/services/translation/locales/`)

Translation data is stored in JSON files organized by language:

```
locales/
├── en.json
└── fr.json
```

**Structure:**
- **Flat Key-Value Pairs**: Simple key-value structure for easy maintenance
- **Pluralization Support**: Object-based translations for plural forms
- **Nested Keys**: Support for dot notation in translation keys

## Key Features

### Multilingual Support

- **Language Detection**: Automatically detects language from router context
- **Dynamic Switching**: Seamless language switching without page reload
- **Fallback Language**: Defaults to French ("fr") if language not specified
- **Document Language**: Automatically updates `document.documentElement.lang`

### Pluralization Support

Uses the `Intl.PluralRules` API for proper pluralization:

```javascript
// Translation file (en.json)
{
  "items": {
    "one": "1 item",
    "other": "{count} items"
  }
}

// Usage in component
const { t } = useTranslation();
t("items", 1); // Returns "1 item"
t("items", 5); // Returns "5 items"
```

**Supported Plural Rules:**
- **English**: one, other
- **French**: one, other
- **Automatic Detection**: Uses browser's `Intl.PluralRules` for language-specific rules

### Translation File Structure

**Simple String Translation:**
```json
{
  "Home": "Accueil",
  "About": "À propos",
  "Login": "Connexion"
}
```

**Pluralization Translation:**
```json
{
  "task": {
    "one": "1 tâche",
    "other": "{count} tâches"
  }
}
```

## Usage Patterns

### Basic Translation Hook

```javascript
import { useTranslation } from "@/services/translation";

function MyComponent() {
  const { t, lang } = useTranslation();
  
  return (
    <div>
      <h1>{t("Home")}</h1>
      <p>Current language: {lang}</p>
    </div>
  );
}
```

### Translation with Pluralization

```javascript
function TaskList({ taskCount }) {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t("task", taskCount)}</h2>
      {/* Renders "1 tâche" or "5 tâches" based on count */}
    </div>
  );
}
```

### Accessing Current Language

```javascript
function LanguageAwareComponent() {
  const { lang } = useTranslation();
  
  return (
    <div>
      {lang === "fr" ? "Bonjour" : "Hello"}
    </div>
  );
}
```

## Integration with Router

### Language Synchronization

The translation service integrates with the router service for seamless language switching:

```javascript
// In Providers.jsx
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

**Flow:**
1. Router detects language from URL path
2. Router updates language state
3. Translation provider receives new language
4. Translation files are loaded for new language
5. Components re-render with new translations

### URL Language Detection

```javascript
// In router/utils.jsx
export const getLangFromPath = (pathname) => {
  const match = pathname.match(/^\/(fr|en)(\/|$)/);
  return match ? match[1] : DEFAULT_LANG;
};
```

## Translation File Management

### File Organization

```
frontend/src/services/translation/locales/
├── en.json          # English translations
└── fr.json          # French translations
```

### Adding New Languages

1. **Create Translation File:**
   ```json
   // locales/es.json
   {
     "Home": "Inicio",
     "About": "Acerca de",
     "Login": "Iniciar sesión"
   }
   ```

2. **Update Router Language Detection:**
   ```javascript
   // In router/utils.jsx
   const match = pathname.match(/^\/(fr|en|es)(\/|$)/);
   ```

3. **Update Translation Check Script:**
   ```bash
   npm run translations -- --languages=fr,en,es
   ```

### Translation Key Naming Conventions

- **PascalCase**: For component names and titles
- **camelCase**: For general text and descriptions
- **UPPER_CASE**: For constants and status messages
- **Descriptive Names**: Use clear, descriptive keys

**Examples:**
```json
{
  "Home": "Accueil",
  "userProfile": "Profil utilisateur",
  "TASK_STATUS_COMPLETED": "Terminé",
  "priorityHigh": "Élevée"
}
```

## Translation Validation

### Check Translations Script (`frontend/src/services/translation/check-translations.js`)

A comprehensive validation script that ensures all translation keys are present in all supported languages:

```bash
npm run translations
```

**Features:**
- **Automatic Scanning**: Scans all `.jsx`, `.tsx` files for `t()` calls
- **Missing Key Detection**: Identifies missing translations across languages
- **Configurable**: Supports custom languages, locales, and file extensions
- **CI/CD Integration**: Exits with error code for automated testing

**Usage:**
```bash
# Check specific languages
npm run translations -- --languages=fr,en

# Check custom locales directory
npm run translations -- --locales=./custom/locales

# Check specific file extensions
npm run translations -- --extensions=jsx,tsx,vue
```

### Script Configuration

**Default Settings:**
- **Languages**: `["en"]`
- **Locales Directory**: `./locales`
- **Source Directory**: `./src`
- **File Extensions**: `[".astro", ".jsx", ".tsx", ".vue"]`

**Custom Configuration:**
```bash
npm run translations -- \
  --languages=fr,en,es \
  --locales=./src/services/translation/locales \
  --src=./src \
  --extensions=jsx,tsx
```

## Error Handling

### Missing Translation Fallback

```javascript
const handleTranslate = (key, count) => {
  // ... translation logic ...
  
  // Fallback to key if translation not found
  return key;
};
```

**Behaviour:**
- **Missing Key**: Returns the translation key as fallback
- **Missing Plural Form**: Falls back to "other" form
- **File Load Error**: Logs warning and continues with empty translations
- **Invalid JSON**: Logs error and skips file

### Development vs Production

**Development:**
- Console warnings for missing translations
- Detailed error logging
- Fallback to translation keys

**Production:**
- Silent fallbacks
- Minimal error logging
- Graceful degradation

## Performance Optimizations

### Translation Caching

```javascript
const translationRef = useRef(null);

useEffect(() => {
  const translation = loadTranslations(lang);
  translationRef.current = translation;
}, [lang]);
```

**Benefits:**
- **Memory Efficiency**: Translations cached in ref
- **Fast Access**: No repeated file loading
- **Language Switching**: Only reloads when language changes

### Code Splitting

```javascript
const files = import.meta.glob("./locales/**/*.json", { eager: true });
```

**Benefits:**
- **Bundle Optimization**: Only loads current language
- **Dynamic Loading**: Supports multiple translation files
- **Tree Shaking**: Unused translations excluded from bundle

## Best Practices

### 1. Translation Key Management

- **Consistent Naming**: Use consistent naming conventions
- **Descriptive Keys**: Make keys self-documenting
- **Namespace Organization**: Group related translations
- **Avoid Duplication**: Reuse common translations

### 2. Pluralization

- **Use Plural Objects**: For countable items
- **Test Edge Cases**: Zero, one, and many cases
- **Language-Specific Rules**: Consider language plural rules
- **Fallback Strategy**: Always provide "other" form

### 3. Component Integration

- **Hook Usage**: Always use `useTranslation()` hook
- **Language Access**: Access `lang` for conditional logic
- **Key Validation**: Use translation check script regularly
- **Performance**: Avoid translation calls in render loops

### 4. File Organization

- **Single File per Language**: Keep languages separate
- **Logical Grouping**: Group related translations
- **Version Control**: Track translation changes
- **Backup Strategy**: Maintain translation backups

## Integration Examples

### Component Usage

```javascript
// Basic component
function WelcomeMessage() {
  const { t } = useTranslation();
  return <h1>{t("Welcome")}</h1>;
}

// Component with pluralization
function TaskCounter({ count }) {
  const { t } = useTranslation();
  return <span>{t("taskCount", count)}</span>;
}

// Component with language awareness
function LanguageSpecificContent() {
  const { lang } = useTranslation();
  return lang === "fr" ? <FrenchContent /> : <EnglishContent />;
}
```

### Form Integration

```javascript
function ContactForm() {
  const { t } = useTranslation();
  
  return (
    <form>
      <label>{t("Name")}</label>
      <input placeholder={t("Enter your name")} />
      <button type="submit">{t("Submit")}</button>
    </form>
  );
}
```

### Navigation Integration

```javascript
function NavigationMenu() {
  const { t } = useTranslation();
  
  return (
    <nav>
      <OykLink routeName="home">{t("Home")}</OykLink>
      <OykLink routeName="about">{t("About")}</OykLink>
      <OykLink routeName="contact">{t("Contact")}</OykLink>
    </nav>
  );
}
```

## Benefits

1. **No External Dependencies**: Self-contained translation solution
2. **React Integration**: Native React Context and hooks
3. **Pluralization Support**: Proper plural handling for all languages
4. **Performance Optimized**: Efficient caching and code splitting
5. **Developer Friendly**: Clear API and validation tools
6. **Router Integration**: Seamless language switching
7. **Type Safety**: JavaScript-based with clear structure
8. **Maintainable**: Simple JSON-based translation files
