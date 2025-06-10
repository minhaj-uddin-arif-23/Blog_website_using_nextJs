/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FilePen, Home } from "lucide-react";

export default function EditForm({ post }: any) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    summary: post.summary,
    readTime: post.readTime,
    tags: post.tags,
    category: post.category,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/"); // or wherever you show posts
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block font-semibold">{key}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      ))}
      <Button type="submit" className="bg-blue-600">
        <FilePen className="w-4 h-4 " /> Update Post
      </Button>
      <Button type="submit" className="bg-blue-600 ml-3">
        {" "}
        <Home className="w-5 h-5" /> Nothing To Update
      </Button>
    </form>
  );
}
