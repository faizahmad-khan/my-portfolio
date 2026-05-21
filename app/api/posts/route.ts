import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts().map((post) => {
    const { content, ...rest } = post;
    void content;
    return rest;
  });
  return NextResponse.json(posts);
}
