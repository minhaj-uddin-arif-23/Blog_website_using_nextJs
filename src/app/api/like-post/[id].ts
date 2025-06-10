// // /pages/api/like-post/[id].ts

// import { NextApiRequest, NextApiResponse } from "next";
// import connectDB from "@/lib/connectDB"; // your MongoDB connection utility
// import { Post } from "@/models/Post";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await connectDB();

//   const postId = req.query.id as string;
//   const userId = req.body.userId as string;

//   if (req.method === "POST") {
//     const post = await Post.findById(postId);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     if (post.likedBy.includes(userId)) {
//       return res.status(400).json({ message: "Already liked" });
//     }

//     post.likes += 1;
//     post.likedBy.push(userId);
//     await post.save();

//     return res.status(200).json({ likes: post.likes });
//   }

//   res.status(405).json({ message: "Method not allowed" });
// }
