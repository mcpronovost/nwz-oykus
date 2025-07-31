import { useEffect } from "react";
import { useRouter } from "@/services/router";
import { api } from "@/services/api";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      router.n("login");
    }
  }, [router]);

  // Don't render children if not authenticated
  if (!api.isAuthenticated()) {
    return null;
  }

  return children;
} 