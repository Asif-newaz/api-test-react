"use client";

import React, { useState, useEffect } from "react";

// Define the Post type
type Post = {
  id: number;
  title: string;
  body: string;
};

const CrudExample: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const createPost = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        }
      );
      const newPost: Post = await response.json();
      setPosts([...posts, newPost]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const updatePost = async (): Promise<void> => {
    if (editingPostId === null) return;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        }
      );
      const updatedPost: Post = await response.json();
      setPosts(
        posts.map((post) => (post.id === editingPostId ? updatedPost : post))
      );
      setEditingPostId(null);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        CRUD Example with Fetch API and TypeScript
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          // value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="border border-gray-300 rounded-md px-4 py-2 mr-2 w-full mb-2 md:mb-0 md:w-auto"
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBody(e.target.value)
          }
          className="border border-gray-300 rounded-md px-4 py-2 mr-2 w-full mb-2 md:mb-0 md:w-auto"
        />
        <button
          onClick={editingPostId ? updatePost : createPost}
          className={`px-4 py-2 rounded-md font-semibold text-white ${
            editingPostId ? "bg-blue-500" : "bg-green-500"
          } hover:opacity-90`}
        >
          {editingPostId ? "Update Post" : "Create Post"}
        </button>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.body}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingPostId(post.id);
                  setTitle(post.title);
                  setBody(post.body);
                }}
                className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-md hover:opacity-90"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-md hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudExample;
