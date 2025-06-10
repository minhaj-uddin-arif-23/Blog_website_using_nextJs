"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface PostProps {
  data: {
    title: string;
    content: string;
    summary: string;
    readTime: string;
    tags: string[];
    category: string;
  };
}

export default function Postdata({ data }: PostProps) {
  const { title, content, summary, readTime, tags, category } = data;

  return (
    <Card className="my-6 shadow-md hover:shadow-xl transition duration-300 border border-muted bg-background">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-sm leading-relaxed">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium text-foreground">Content:</span>{" "}
          {content}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-muted-foreground">
            ⏱ <span className="font-medium">Read Time:</span> {readTime}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Category:</span> {category}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">{tags}</div>
      </CardContent>
    </Card>
  );
}
