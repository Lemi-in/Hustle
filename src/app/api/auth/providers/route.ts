import { authConfig } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const providers = authConfig.providers.map((provider) => ({
    id: provider.id,
    name: provider.name,
    type: provider.type,
  }));
  return NextResponse.json(providers);
} 