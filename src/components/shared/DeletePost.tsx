"use client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeletePost({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    const res = await fetch(`/api/delete-post/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Post deleted");
      router.refresh(); // Refreshes current route to reflect change
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <Button onClick={handleDelete} className="bg-red-600 text-white flex items-center gap-2">
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  );
}
