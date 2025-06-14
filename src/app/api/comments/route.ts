/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request):Promise<Response>  {
  try {
    const body = await req.json();
    const { postId, name, email, image, comment } = body;

    if (!postId || !comment || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise; // get connected MongoClient
    const db = client.db(); // optionally pass DB name here if not in MONGODB_URI

    const newComment = await db.collection("comments").insertOne({
      postId,
      name,
      email,
      image,
      comment,
      createdAt: new Date(),
    });
    console.log("new comment", newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
