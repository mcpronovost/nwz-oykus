import { useRouter } from "@/services/router";

export default function Link({ children, routeName, ...props }) {
  const { n, lang } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    n(routeName);
  };

  return (
    <a href={`/${lang}/${routeName}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}