"use client";

import { PenLine, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/createPost");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-indigo-700 tracking-tight">
          Writora
        </div>

        {/* Search */}
        <div className="w-full md:w-1/2 relative">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Search articles, tags, authors..."
            className="pl-10 bg-white dark:bg-slate-800 text-sm rounded-xl"
          />
        </div>

        {/* Write Button */}
        <Button
          onClick={handleNavigation}
          className="bg-indigo-600 hover:bg-sky-400 hover:text-black cursor-pointer text-white rounded-sm flex items-center gap-2 px-4 py-2 shadow-md"
        >
          <PenLine className="w-4 h-4" />
          <span className="text-sm font-medium">Write Post </span>
        </Button>
      </div>
    </header>
  );
}
