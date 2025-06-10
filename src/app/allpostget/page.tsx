// import Postdata from "@/components/shared/Postdata";
// import clientPromise from "@/lib/mongodb";

// export default async function PostsPage() {
//   const client = await clientPromise;
//   const db = client.db("blogDb");
//   const posts = await db.collection("posts").find({}).toArray();
//   console.log("data", posts);
//   return (
//     <div>
//       <h1>Posts</h1>
//       {posts.map((post) => {
//         console.log("Each post from DB:", post);
//         return <Postdata key={post._id.toString()} data={post} />;
//       })}
//     </div>
//   );
// }
