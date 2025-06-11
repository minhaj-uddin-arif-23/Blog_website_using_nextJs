import Image from "next/image";
import { format } from "date-fns";
import ShareWrapper from "./ShareWrapper";
// import SocialShare from "./SocialShare";

interface Author {
  name: string;
  avatar: string;
}

interface Post {
  category: string;
  readTime: number;
  title: string;
  tags?: string[];
  author?: Author;
  createdAt: string | Date;
  featuredImage?: string;
  content: string;
}

interface BlogDetailsPageProps {
  post: Post;
}

const BlogDetailsPage = ({ post }: BlogDetailsPageProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <header className="mb-8">
        {/* Category */}
        <div className="flex items-center mb-4">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-100">
            {post.category}
          </span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">{post.tags}</div>

        {/* Author and Date (optional) */}
        {post.author && (
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <Image
                className="w-10 h-10 rounded-full"
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article className="prose dark:prose-invert max-w-none">
        <div
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Share Buttons */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Share this post
        </h3>
        <div className="flex space-x-4">
          <ShareWrapper title={post.title} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
