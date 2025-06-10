"use client";

import { useEffect, useState } from "react";
import ShowPost from "./ShowPost";
import { PenLine, Search } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
      <section className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col md:flex-row justify-evenly items-start md:items-center px-4 sm:px-6 lg:px-8 py-4 gap-4 md:gap-0 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mr-44">
          Latest Posts
        </h1>
        <div className="w-full md:w-1/2 relative max-w-md lg:mr-[15rem]">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-5 h-5 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search posts title, content, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        

        <div className="flex gap-3">
          <Button
            onClick={handleNavigation}
            className="bg-indigo-600 hover:bg-sky-400 hover:text-black cursor-pointer text-white rounded-sm flex items-center gap-2 px-4 py-2 shadow-md"
          >
            <PenLine className="w-4 h-4" />
            <span className="text-sm font-medium">Write Post </span>
          </Button>
          <UserButton />
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
