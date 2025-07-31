import { useRouter } from "@/services/router";

export default function AppBarAuth() {
  const { n } = useRouter();

  return (
    <section className="oyk-app-bar-auth">
      <button className="oyk-app-bar-auth-button" onClick={() => n("login")}>
        Sign In
      </button>
    </section>
  );
}
