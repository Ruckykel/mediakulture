"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterVisibility() {
  const pathname = usePathname() || "";
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboard = pathname.startsWith("/dashboard");

  if (isAuthPage || isDashboard) {
    return null;
  }

  return <Footer />;
}


