import { useRouter } from "@/services/router";
import { buildRoutePath } from "@/services/router/utils";

export default function Link({ children, routeName, params = {}, disabled = false, ...props }) {
  const { n, lang } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      n(routeName, lang, params);
    }
  };

  const href = !disabled ? `/${lang}/${buildRoutePath(routeName, lang, params) || ""}` : "/";

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}