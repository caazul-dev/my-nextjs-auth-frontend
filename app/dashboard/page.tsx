"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
}

interface Post {
  id: string | number;
  title: string;
  content: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    async function loadDashboardData() {
      try {
        // 1. Fetch User Profile
        const profile = await apiClient("/auth/profile").catch(() => null);
        if (profile) setUser(profile);

        // 2. Fetch Posts
        const postsData = await apiClient("/posts").catch(() => []);
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    try {
      const created = await apiClient("/posts", {
        method: "POST",
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      setPosts((prev) => [created, ...prev]);
      setNewTitle("");
      setNewContent("");
    } catch (err: any) {
      alert(err.message || "Failed to create post");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Logged in as: <span className="font-semibold">{user?.username || "Authenticated User"}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* Create Post Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Create New Post</h2>
          <form onSubmit={handleCreatePost} className="space-y-3">
            <input
              type="text"
              placeholder="Post Title"
              className="w-full p-2 border rounded-md"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Write content here..."
              className="w-full p-2 border rounded-md h-24"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm font-medium"
            >
              Publish Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Feed / Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No posts available yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <div key={post.id || idx} className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-bold text-md text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}