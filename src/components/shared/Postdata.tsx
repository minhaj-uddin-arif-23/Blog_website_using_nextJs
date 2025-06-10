"use client";

import { useEffect, useState } from "react";
import ShowPost from "./ShowPost";
import { PenLine, Search } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ModeToggle";

type Post = {
  _id: string;
  title: string;
  content: string;
  summary: string;
  readTime: string;
  tags: string[];
  category: string;
};

type Props = {
  initialPage: Post[];
};

export default function Postdata({ initialPage }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPage || []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.content.toLowerCase().includes(lower) ||
        post.category.toLowerCase().includes(lower)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const handleRemovePost = (id: string) => {
    const updated = posts.filter((post) => post._id !== id);
    setPosts(updated);
    setFilteredPosts(updated);
  };
  const router = useRouter();
  // const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = () => {
    router.push("/createPost");
  };
  return (
    <div>
   <section className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-4 border-b border-slate-200 dark:border-slate-700">
  {/* Title - Left on desktop, top on mobile */}
  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white order-1 md:order-none min-w-[150px]">
    Latest Posts
  </h1>

  {/* Search - Middle, full width on mobile */}
  <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] relative order-3 md:order-none mx-auto md:mx-0">
    <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-5 h-5 dark:text-slate-500" />
    <input
      type="text"
      placeholder="Search posts title, content, category..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
    />
  </div>

  {/* Right side elements - Top right on desktop, bottom on mobile */}
  <div className="flex items-center gap-4 order-2 md:order-none ml-auto">
    <div className="hidden sm:block">
      <ModeToggle />
    </div>
    
    <div className="flex gap-3">
      <Button
        onClick={handleNavigation}
        className="bg-blue-600 hover:bg-sky-600 hover:text-white cursor-pointer text-white rounded-sm flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 shadow-md text-xs sm:text-sm"
      >
        <PenLine className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="font-medium ">Write Post</span>
      </Button>
      <UserButton />
    </div>
  </div>

  {/* Mode toggle for mobile - Hidden on desktop */}
  <div className="block sm:hidden order-4 w-full text-center md:hidden">
    <ModeToggle />
  </div>
</section>

      <p className="text-gray-900 dark:text-slate-300 flex justify-start mt-5 ml-52">
          {filteredPosts?.length} Posts Found
        </p>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id.toString()}>
              <ShowPost
                data={post}
                handleRemovePost={() => handleRemovePost(post._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
