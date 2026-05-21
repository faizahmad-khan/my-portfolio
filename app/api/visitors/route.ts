import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ count: 0 });
  }

  const { data } = await supabase
    .from("visitors")
    .select("count")
    .eq("id", 1)
    .single();

  return NextResponse.json({ count: data?.count ?? 0 });
}

export async function POST() {
  if (!supabase) {
    return NextResponse.json({ count: 0 });
  }

  const { data } = await supabase
    .from("visitors")
    .select("count")
    .eq("id", 1)
    .single();

  const newCount = (data?.count ?? 0) + 1;

  await supabase.from("visitors").update({ count: newCount }).eq("id", 1);

  return NextResponse.json({ count: newCount });
}