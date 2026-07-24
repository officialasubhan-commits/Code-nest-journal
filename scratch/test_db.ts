import "dotenv/config";
import prisma from "../src/lib/prisma";

async function run() {
  console.log("Starting DB query test with proper env variables...");
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const queries = [
    { name: "post.count", fn: () => prisma.post.count() },
    { name: "project.count(published)", fn: () => prisma.project.count({ where: { published: true } }) },
    { name: "message.count(unread)", fn: () => prisma.message.count({ where: { read: false } }) },
    { name: "user.count", fn: () => prisma.user.count() },
    { name: "galleryImage.count", fn: () => prisma.galleryImage.count() },
    { name: "post.findMany(recent)", fn: () => prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }) },
    { name: "pageView.findMany(7days)", fn: () => prisma.pageView.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true }
    }) },
    { name: "maintenanceLog.findMany", fn: () => prisma.maintenanceLog.findMany() },
    { name: "generalSettings.findFirst", fn: () => prisma.generalSettings.findFirst({ select: { updatedAt: true } }) },
    { name: "post.findFirst(recentUpdate)", fn: () => prisma.post.findFirst({ orderBy: { updatedAt: 'desc' }, select: { updatedAt: true } }) },
    { name: "project.findFirst(recentUpdate)", fn: () => prisma.project.findFirst({ orderBy: { updatedAt: 'desc' }, select: { updatedAt: true } }) },
    { name: "galleryImage.findFirst(recentCreate)", fn: () => prisma.galleryImage.findFirst({ orderBy: { createdAt: 'desc' }, select: { createdAt: true } }) },
    { name: "activity.findMany", fn: () => prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { user: { select: { name: true, image: true, email: true } } }
    }) },
    { name: "brandSettings.findUnique", fn: () => prisma.brandSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "seoSettings.findUnique", fn: () => prisma.seoSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "homepageSettings.findUnique", fn: () => prisma.homepageSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "aboutSettings.findUnique", fn: () => prisma.aboutSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "contactSettings.findUnique", fn: () => prisma.contactSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "courseSettings.findUnique", fn: () => prisma.courseSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "certificateSettings.findUnique", fn: () => prisma.certificateSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "notificationSettings.findUnique", fn: () => prisma.notificationSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "gallerySettings.findUnique", fn: () => prisma.gallerySettings.findUnique({ where: { id: "singleton" } }) },
    { name: "footerSettings.findUnique", fn: () => prisma.footerSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "generalSettings.findUnique", fn: () => prisma.generalSettings.findUnique({ where: { id: "singleton" } }) },
    { name: "maintenanceSettings.findUnique", fn: () => prisma.maintenanceSettings.findUnique({ where: { id: "singleton" } }) }
  ];

  for (const query of queries) {
    try {
      console.log(`Executing ${query.name}...`);
      const result = await query.fn();
      console.log(`Successfully completed ${query.name}`);
    } catch (e: any) {
      console.error(`❌ FAILED ${query.name}:`, e.message || e);
    }
  }

  await prisma.$disconnect();
}

run();
