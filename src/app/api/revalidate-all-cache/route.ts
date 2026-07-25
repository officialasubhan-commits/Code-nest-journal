import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("Triggering cache purge for site-settings and sitemap...");
  revalidateTag("site-settings", "max");
  revalidateTag("homepage-data", "max");
  revalidatePath("/", "layout");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
