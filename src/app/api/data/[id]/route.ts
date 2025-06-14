/* eslint-disable @typescript-eslint/no-unused-vars */
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  context: { params: { id: string } }
): Promise<Response> {
  const { id } = context.params;

  try {
    const client = await clientPromise;

    const db = client.db("blogDb");
    const data = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    if (!data) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch the data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
