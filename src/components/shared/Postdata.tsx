"use client";

import { useEffect, useState } from "react";
import ShowPost from "./ShowPost";

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

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  const handleRemovePost = (id: string) => {
    setPosts(posts.filter((post) => post._id != id));
  };



  return (
    <div>
      <h1 className="text-3xl font-bold  flex justify-start text-start ml-52 mt-10">
        Latest Posts..
      </h1>
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <div key={post._id.toString()}>
              <ShowPost  data={post}
                handleRemovePost={()=>handleRemovePost(post._id)}
              />
             
               

            </div>
          ))
        )}
      </div>
    </div>
  );
}
