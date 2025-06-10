// app/api/search/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    const client = await clientPromise;
    const db = client.db("your-db-name"); // replace with your database name
    const collection = db.collection("your-collection-name"); // replace with your collection name

    const posts = await collection
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
