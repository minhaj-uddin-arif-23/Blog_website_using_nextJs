/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/[id]/page.tsx
import Comment from "@/components/model/Comment";
import connectToDB from "@/lib/mongodb";
import Image from "next/image";

export default async function BlogPage({ params }: { params: { id: string } }) {
  await connectToDB;
  const comments = await Comment.find({ postId: params.id }).sort({ createdAt: -1 });

  return (
    <div>
      <h1>Blog Post ID: {params.id}</h1>

      <h2 className="mt-6 text-xl font-semibold">Comments</h2>
      <ul className="mt-4 space-y-4">
        {comments.map((c: any) => (
          <li key={c._id} className="border p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              {c.image && (
                <Image src={c.image} width={30} height={30} alt={c.name} className="rounded-full" />
              )}
              <div>
                <p className="text-sm font-medium">{c.name} ({c.email})</p>
                <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <p>{c.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
