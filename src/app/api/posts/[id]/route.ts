import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const params = await context.params; // Resolve the Promise
  const { id } = params;

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("blogDb");

    const result = await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: body });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "Post updated", result });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update the post",
        error,
      },
      { status: 500 }
    );
  }
}