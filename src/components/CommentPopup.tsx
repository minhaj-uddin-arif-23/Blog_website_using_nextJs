// components/CommentPopup.tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import toast from "react-hot-toast";

type Props = {
  postId: string;
  name: string;
  email: string;
  image?: string;
};

export function CommentPopup({ postId, name, email, image }: Props) {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, name, email, image, comment }),
    });

    if (res.ok) {
      setComment("");
      toast.success("Comment submitted!");
    } else {
      toast.error("Failed to submit comment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
        >
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmit}>Post Comment</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
