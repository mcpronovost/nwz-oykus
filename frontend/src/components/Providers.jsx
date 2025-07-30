import { RouterProvider } from "@/services/router";
import { StoreProvider } from "@/services/store";
import { TranslationProvider } from "@/services/translation";
import { DEFAULT_LANG } from "@/services/translation/utils";

export default function Providers({ children, lang = DEFAULT_LANG }) {
  return (
    <StoreProvider>
      <RouterProvider>
        <TranslationProvider lang={lang}>{children}</TranslationProvider>
      </RouterProvider>
    </StoreProvider>
  );
}
