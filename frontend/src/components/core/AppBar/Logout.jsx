import { useRouter } from "@/services/router";
import { api } from "@/services/api";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.logout();
      router.n("login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, clear local data and redirect
      router.n("login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      Logout
    </button>
  );
} 