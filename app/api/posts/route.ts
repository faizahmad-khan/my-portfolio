import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts().map(({ content, ...rest }) => rest);
  return NextResponse.json(posts);
}
