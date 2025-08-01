import { useTranslation } from "@/services/translation";
import Link from "@/components/common/Link";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("Home")}</h1>
      
      <div style={{ marginTop: "20px" }}>
        <h2>Test Routes:</h2>
        <ul>
          <li>
            <Link routeName="home">
              Home: /en/ (root)
            </Link>
          </li>
          <li>
            <Link routeName="world-home" params={{ worldSlug: "qalatlan" }}>
              World Home: /en/w/qalatlan
            </Link>
          </li>
          <li>
            <Link routeName="world-rulebook" params={{ worldSlug: "qalatlan" }}>
              World Rulebook: /en/w/qalatlan/rulebook
            </Link>
          </li>
          <li>
            <Link routeName="world-user-post" params={{ worldSlug: "qalatlan", userId: "123", postId: "456" }}>
              World User Post: /en/w/qalatlan/users/123/posts/456
            </Link>
          </li>
          <li>
            <Link routeName="world-home" params={{ worldSlug: "testworld" }}>
              Another World: /en/w/testworld
            </Link>
          </li>
          <li>
            <Link routeName="tasks">
              Tasks: /en/tasks
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home; 