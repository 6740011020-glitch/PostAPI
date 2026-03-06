"use client";

import { useEffect, useState } from "react";

interface Author {
  id: number;
  email: string;
  name: string | null;
}

interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
  author: Author;
}

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="p-8">กำลังโหลด...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">โพสต์ทั้งหมด</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">ไม่มีโพสต์</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {post.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ml-2 ${
                    post.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {post.published ? "เผยแพร่" : "ไม่เผยแพร่"}
                </span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.content || "-"}</p>
              <div className="text-sm text-gray-500 border-t pt-4">
                <p>
                  <span className="font-medium">ผู้เขียน:</span> {post.author.name || "-"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {post.author.email}
                </p>
                <p>
                  <span className="font-medium">Post ID:</span> {post.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
