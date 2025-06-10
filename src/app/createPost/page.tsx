/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");

  const handlePublish = async () => {
    const data = {
      title,
      content,
      tags,
      readTime,
      summary,
      category,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create`,
        {
          data,
        }
      );

      console.log("✅ Post saved:", res.data);
      alert("Post published successfully!");
    } catch (err) {
      console.error("❌ Failed to save post:", err);
      alert("Error saving post.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold mb-4">📝 Write a Blog Post</h2>

          <Card className="shadow-md">
            <CardHeader>
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your blog title?"
              />
            </CardHeader>

            <CardContent>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing here..."
              />
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handlePublish}>Publish</Button>
            </CardFooter>
          </Card>

          <div className="flex gap-4">
            <Card className="w-full">
              <CardHeader>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags (comma separated)..."
                />
              </CardHeader>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <Label htmlFor="read-time">Read Time (min)</Label>
                <Input
                  id="read-time"
                  type="number"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 4"
                />
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          {/* Summary */}
          <Card>
            <CardHeader>
              <Label>Blog Summary</Label>
            </CardHeader>
            <CardContent>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="AI/Manual short summary..."
              />
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <Label>Category</Label>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="life">Lifestyle</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
