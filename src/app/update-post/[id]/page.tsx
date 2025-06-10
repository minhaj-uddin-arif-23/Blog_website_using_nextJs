import EditForm from "@/components/shared/EditForm";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function UpdatePostPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await clientPromise;
  const db = client.db("blogDb");
  const post = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(params.id) });

  if (!post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditForm post={post} />
    </div>
  );
}
