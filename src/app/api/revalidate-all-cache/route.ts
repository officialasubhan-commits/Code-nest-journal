import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("Triggering cache purge for site-settings and sitemap...");
  revalidateTag("site-settings");
  revalidateTag("homepage-data");
  revalidatePath("/");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
