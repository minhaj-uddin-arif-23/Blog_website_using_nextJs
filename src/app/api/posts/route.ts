/* eslint-disable @typescript-eslint/no-unused-vars */
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("blogDb");
    const collection = await db.collection("posts").find({}).toArray();

    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json(
      { error: "Failded to fetch the data" },
      { status: 500 }
    );
  }
}
