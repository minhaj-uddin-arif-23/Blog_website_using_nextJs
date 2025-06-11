"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SocialShare from "./SocialShare"; // Adjust path if needed

interface ShareWrapperProps {
  title: string;
}

export default function ShareWrapper({ title }: ShareWrapperProps) {
  const pathname = usePathname();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  if (!url) return null;

  return <SocialShare url={url} title={title} />;
}
