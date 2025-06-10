"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface PostProps {
  data: {
    _id: string;
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
        <section className="flex gap-4">
          <Link href={`/update-post/${data._id}`}>
            <Button className="bg-blue-600 flex items-center gap-2 cursor-pointer">
              <Pencil className="w-4 h-4" />
              Update
            </Button>
          </Link>
          <Button className="bg-red-500 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Cancel
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
