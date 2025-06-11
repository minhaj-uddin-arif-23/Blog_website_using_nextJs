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
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { CommentPopup } from "../CommentPopup";
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
    <Card className="my-6 w-[380px] h-[345px] flex flex-col justify-between 
             shadow-md hover:shadow-xl transition duration-300 
             border border-muted bg-background overflow-hidden ">
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
          {/* <span className="font-medium text-foreground"></span>{" "} */}
          {content.split(" ").slice(0, 20).join(" ")} ...
          <Link href={`/data/${_id}`} className="text-blue-500 hover:underline ml-2">See more</Link>
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-muted-foreground">
            {"⏱ "}
            <span className="font-medium">Read Time:</span> {readTime}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Category:</span> {category}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">{tags}</div>

        <section className="flex justify-between">
          <section className="flex gap-4">
            <Link href={`/update-post/${_id}`}>
              <Button className="border-1 px-3 hover:bg-sky-600 hover:text-white rounded-2xl flex items-center gap-2 cursor-pointer bg-blue-600 text-white">
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <button
              onClick={handleDelete}
              className="border-1 px-3 rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-red-600 hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </section>
          <section className="">
            <div className="flex items-center gap-4 mt-2">
              {/* Like Button */}
              <button className="flex items-center gap-1 hover:text-red-600">
                <Heart size={20} />
                <span></span>
              </button>
              {/* Comment Button */}
              {/* <button className="flex items-center gap-1 hover:text-blue-600"> */}
              {/* <MessageCircle size={20} /> */}{" "}
              <CommentPopup postId={""} name={""} email={""} />{" "}
              {/* </button> */}
            </div>
          </section>
        </section>
      </CardContent>
    </Card>
  );
}
