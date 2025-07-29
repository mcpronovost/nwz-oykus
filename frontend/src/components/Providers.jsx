import { RouterProvider } from "@/services/router";

export default function Providers({ children }) {
  return <RouterProvider>{children}</RouterProvider>;
}