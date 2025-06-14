import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request, { params }: { params: { id: string } }):Promise<Response> {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("blogDb");

  const result = await db.collection("posts").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  );

  return NextResponse.json({ message: "Post updated", result });
}
