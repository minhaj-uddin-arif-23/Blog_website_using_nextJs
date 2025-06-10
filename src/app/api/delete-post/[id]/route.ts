import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("blogDb");

    const result = await db.collection("posts").deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete post", error }, { status: 500 });
  }
}
