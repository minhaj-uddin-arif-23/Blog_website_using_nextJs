import BlogDetailsPage from "@/components/shared/BlogDetailsPage";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  content: string;
  summary: string;
  readTime: number;
  tags?: string[];
  category: string;
  createdAt: string | Date;
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const client = await clientPromise;
  const db = client.db("blogDb");

  try {
    const result = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(params.id) });

    if (!result) return notFound(); // better UX for missing pages

    const post: Post = {
      _id: result._id.toString(),
      title: result.title ?? "Untitled",
      content: result.content ?? "",
      summary: result.summary ?? "",
      readTime: typeof result.readTime === "number" ? result.readTime : parseInt(result.readTime) || 1,
      tags: result.tags ?? [],
      category: result.category ?? "General",
      createdAt: result.createdAt ? result.createdAt.toString() : new Date().toISOString(),
    };

    return (
      <div>
        <BlogDetailsPage key={post._id} post={post} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return notFound(); // fallback for invalid ObjectId etc.
  }
}
