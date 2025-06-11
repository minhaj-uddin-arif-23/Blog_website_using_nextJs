/* eslint-disable @typescript-eslint/no-unused-vars */
// /api/posts/route.ts
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("blogDb");

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const totalPosts = await db.collection("posts").countDocuments();
    const posts = await db
      .collection("posts")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      posts,
      total: totalPosts,
      page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

