import { useEffect } from "react";
import { useRouter } from "../services/router";

function Home() {
  const { route, locale } = useRouter();
  useEffect(() => {
    console.log("route", route);
    console.log("locale", locale);
  }, [route, locale]);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default Home; 