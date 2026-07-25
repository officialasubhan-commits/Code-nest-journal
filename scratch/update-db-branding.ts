import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("Connecting to production database via pg adapter...");

  // Update BrandSettings
  const brand = await prisma.brandSettings.upsert({
    where: { id: "singleton" },
    update: {
      siteTitle: "Code Nest",
      siteUrl: "https://code-nest-journal.vercel.app",
    },
    create: {
      id: "singleton",
      siteTitle: "Code Nest",
      siteUrl: "https://code-nest-journal.vercel.app",
      siteTagline: "My personal portfolio, journal, and digital headquarters.",
      siteDescription: "My personal portfolio, journal, and digital headquarters.",
    },
  });
  console.log("Updated BrandSettings successfully:", brand);

  // Update SeoSettings
  const seo = await prisma.seoSettings.upsert({
    where: { id: "singleton" },
    update: {
      seoTitle: "Code Nest | Portfolio & Digital Home",
    },
    create: {
      id: "singleton",
      seoTitle: "Code Nest | Portfolio & Digital Home",
      seoDescription: "My digital home, where I document my journey, learning, projects, and daily life.",
    },
  });
  console.log("Updated SeoSettings successfully:", seo);
}

main()
  .catch((e) => {
    console.error("Error updating database branding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
