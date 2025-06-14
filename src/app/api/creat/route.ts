/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/create/route.js

import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Post } from "@/components/model/Post";
import clientPromise from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: any): Promise<Response> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "/public/uploads"),
      keepExtensions: true,
      multiples: true, // Optional: allow multiple file uploads
    });

    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        console.error("Form parsing error:", err);
        return resolve(
          new Response(JSON.stringify({ message: "Upload failed" }), {
            status: 500,
          })
        );
      }

      try {
        await clientPromise;

        const imagePath = files.image?.[0]?.newFilename;

        const newPost = new Post({
          title: fields.title?.[0],
          content: fields.content?.[0],
          tags: fields.tags?.[0],
          readTime: fields.readTime?.[0],
          summary: fields.summary?.[0],
          category: fields.category?.[0],
          image: `/uploads/${imagePath}`,
        });

        await newPost.save();

        return resolve(
          new Response(
            JSON.stringify({ message: "Post created", post: newPost }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            }
          )
        );
      } catch (dbErr) {
        console.error("Database error:", dbErr);
        return resolve(
          new Response(JSON.stringify({ message: "Database error" }), {
            status: 500,
          })
        );
      }
    });
  });
}
