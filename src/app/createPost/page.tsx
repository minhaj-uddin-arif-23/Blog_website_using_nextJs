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
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Blog Details */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold mb-4">📝 Write a Blog Post</h2>

          <Card className="shadow-md">
            <CardHeader>
              <Label htmlFor="title">Blog Title</Label>
              <Input id="title" placeholder="What's your blog title?" />
            </CardHeader>

            <CardContent>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={12}
                placeholder="Start writing here..."
              />
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Publish</Button>
            </CardFooter>
          </Card>

          <div className="flex gap-4">
            <Card className="w-full">
              <CardHeader>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Add tags (comma separated)..." />
              </CardHeader>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <Label htmlFor="read-time">Read Time (min)</Label>
                <Input id="read-time" type="number" placeholder="e.g. 4" />
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Right Section - AI Assistant and Meta Info */}
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <h3 className="font-semibold">🤖 AI Assistant</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full">
                Generate Summary
              </Button>
              <Button variant="secondary" className="w-full">
                Suggest Title
              </Button>
              <Button variant="secondary" className="w-full">
                Fix Grammar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Label>Blog Summary</Label>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="AI/Manual short summary..." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Label>Category</Label>
            </CardHeader>
            <CardContent>
              <Select>
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

          <Card>
            <CardHeader>
              <Label>Status</Label>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Badge variant="outline">Draft</Badge>
                <Badge>Public</Badge>
                <Badge variant="destructive">Private</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
