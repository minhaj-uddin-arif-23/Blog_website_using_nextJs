/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
type Post = {
  _id: string;
  title: string;
  content: string;
  summary: string;
  readTime: string;
  tags: string[];
  category: string;
};

type PostProps = {
  data: Post;
  handleRemovePost?: () => void;
};

export default function ShowPost({ data, handleRemovePost }: PostProps) {
  const { _id, title, content, summary, readTime, tags, category } = data;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      toast("Cancelled");
      return;
    }

    try {
      const res = await fetch(`/api/delete-post/${data._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Post deleted successfully!");
        handleRemovePost?.(); // remove from UI without refresh
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <Card className="my-6 shadow-md hover:shadow-xl transition duration-300 border border-muted bg-background">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-sm leading-relaxed">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium text-foreground">Content:</span>{" "}
          {content}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-muted-foreground">
            ⏱ <span className="font-medium">Read Time:</span> {readTime}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Category:</span> {category}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">{tags}</div>

        <section className="flex gap-4">
          <Link href={`/update-post/${_id}`}>
            <Button className="bg-blue-600 flex items-center gap-2 cursor-pointer">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          <Button
            onClick={handleDelete}
            className="bg-red-500 flex items-center gap-2 cursor-pointers"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
