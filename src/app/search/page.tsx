/* eslint-disable react/no-unescaped-entities */
// app/search/page.tsx
"use client";

import ShowPost from "@/components/shared/ShowPost";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

type Post = {
  _id: string;
  title: string;
  content: string;
  summary: string;
  readTime: string;
  tags: string[];
  category: string;
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [query]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <ShowPost key={post._id} data={post} handleRemovePost={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}