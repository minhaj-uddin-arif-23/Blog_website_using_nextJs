import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request):Promise<Response> {
  try {
    const { data } = await req.json();
    const client = await clientPromise;
    const db = client.db("blogDb"); // Use the same name as in your URI
    const posts = db.collection("posts");

    const result = await posts.insertOne(data);

    return NextResponse.json({
      message: "Post created successfully",
      postId: result.insertedId,
    });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
