import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Visitor tracking moved to /api/visit" },
    { status: 301 }
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "Visitor tracking moved to /api/visit" },
    { status: 301 }
  );
}