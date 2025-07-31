import { useRouter } from "@/services/router";

export default function Link({ children, routeName, disabled = false, ...props }) {
  const { n, lang } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      n(routeName);
    }
  };

  return (
    <a href={!disabled ? `/${lang}/${routeName}` : "/"} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}