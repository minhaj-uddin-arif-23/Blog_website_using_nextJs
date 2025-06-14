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

export default function Postdata() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const limit = 8;

  useEffect(() => {
    fetch(`/api/posts?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setFilteredPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch(console.error);
  }, [page]);

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
  const handleNavigation = () => {
    router.push("/createPost");
  };

  return (
    <div>
      {/* Header */}
      <section className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-4 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Latest Posts
        </h1>

        <div className="w-full md:w-[40%] relative">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-5 h-5 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search posts title, content, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-xl border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            onClick={handleNavigation}
            className="bg-blue-600 hover:bg-sky-600 text-white flex items-center gap-2 cursor-pointer"
          >
            <PenLine className="w-4 h-4" />
            <span>Write Post</span>
          </Button>
          <UserButton />
        </div>
      </section>

      {/* Results */}
      <p className="text-gray-900 dark:text-slate-300 mt-5 ml-52">
        {filteredPosts?.length} Posts Found
      </p>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
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

      {/* Pagination Controls */}
   {/* Button-wise Pagination */}
<div className="flex justify-center items-center mt-7 mb-12 gap-2 flex-wrap">
  <Button
    variant="outline"
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
  >
    Previous
  </Button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
    <Button
      key={pg}
      variant={pg === page ? "default" : "outline"}
      className={`w-10 h-10 p-0 ${pg === page ? "bg-blue-600 text-white" : ""}`}
      onClick={() => setPage(pg)}
    >
      {pg}
    </Button>
  ))}

  <Button
    variant="outline"
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
  >
    Next
  </Button>
</div>

    </div>
  );
}
