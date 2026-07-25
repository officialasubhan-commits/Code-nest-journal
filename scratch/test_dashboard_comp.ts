import "dotenv/config";
import prisma from "../src/lib/prisma";
import { formatDistanceToNow } from "date-fns";

async function run() {
  console.log("Running component logic simulation (bypassing next/cache)...");
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Bypassing next/cache for site settings
    const brand = await prisma.brandSettings.findUnique({ where: { id: "singleton" } });
    const [
      seo,
      homepage,
      about,
      contact,
      course,
      certificate,
      notification,
      gallery,
      footer,
      general,
      maintenance
    ] = await Promise.all([
      prisma.seoSettings.findUnique({ where: { id: "singleton" } }),
      prisma.homepageSettings.findUnique({ where: { id: "singleton" } }),
      prisma.aboutSettings.findUnique({ where: { id: "singleton" } }),
      prisma.contactSettings.findUnique({ where: { id: "singleton" } }),
      prisma.courseSettings.findUnique({ where: { id: "singleton" } }),
      prisma.certificateSettings.findUnique({ where: { id: "singleton" } }),
      prisma.notificationSettings.findUnique({ where: { id: "singleton" } }),
      prisma.gallerySettings.findUnique({ where: { id: "singleton" } }),
      prisma.footerSettings.findUnique({ where: { id: "singleton" } }),
      prisma.generalSettings.findUnique({ where: { id: "singleton" } }),
      prisma.maintenanceSettings.findUnique({ where: { id: "singleton" } })
    ]);

    const settings = {
      id: "singleton",
      siteTitle: brand?.siteTitle || "Code Nest",
      siteTagline: brand?.siteTagline || "My personal portfolio, journal, and digital headquarters.",
      siteDescription: brand?.siteDescription || "My personal portfolio, journal, and digital headquarters.",
      siteLogo: brand?.siteLogo || "",
      siteFavicon: brand?.siteFavicon || "",
      defaultTheme: brand?.defaultTheme || "light",
      defaultLanguage: brand?.defaultLanguage || "en",
      siteUrl: brand?.siteUrl || "https://code-nest-journal.vercel.app",
      brandColors: brand?.brandColors || { primary: "#F97316", accent: "#FB7185" },

      seoTitle: seo?.seoTitle || "Code Nest | Portfolio & Digital Home",
      seoDescription: seo?.seoDescription || "My digital home, where I document my journey, learning, projects, and daily life.",
      seoKeywords: seo?.seoKeywords || "",
      ogImage: seo?.ogImage || "",
      robots: seo?.robots || "index, follow",
      canonicalUrl: seo?.canonicalUrl || "",
      twitterCards: seo?.twitterCards || "summary_large_image",
      structuredData: seo?.structuredData || {},

      heroTitle: homepage?.heroTitle || "Designing simple, warm & premium digital experiences.",
      heroHighlighted: homepage?.heroHighlighted || "warm & premium",
      heroDescription: homepage?.heroDescription || "I am a Software Engineer and UI/UX Designer. This is my digital space where I log my daily learnings, showcase craft projects, and write summaries.",
      heroProfileImage: homepage?.heroProfileImage || "",
      heroBgDecor: homepage?.heroBgDecor || "glow",
      heroBtnPrimaryText: homepage?.heroBtnPrimaryText || "Explore Projects",
      heroBtnPrimaryLink: homepage?.heroBtnPrimaryLink || "/projects",
      heroBtnSecondaryText: homepage?.heroBtnSecondaryText || "Read Journal",
      heroBtnSecondaryLink: homepage?.heroBtnSecondaryLink || "/journal",
      authorTitle: homepage?.authorTitle || "Software Engineer & UI/UX Designer",
      authorBio: homepage?.authorBio || "Based in India. Focuses on Next.js 16, React 19, TypeScript, and modern clean interface details.",
      featuredProjects: homepage?.featuredProjects || [],
      featuredPosts: homepage?.featuredPosts || [],
      featuredCertificates: homepage?.featuredCertificates || [],
      featuredCourses: homepage?.featuredCourses || [],
      typingConfig: homepage?.typingConfig || {
        textColor: "#F97316",
        cursorColor: "#F97316",
        cursorWidth: "3px",
        cursorBlinkSpeed: "1s",
      },
      
      launchedAt: general?.launchedAt || new Date(),
      maintenanceEnabled: maintenance?.maintenanceEnabled || false,
    };

    const [
      totalPosts,
      activeProjects,
      unreadMessages,
      totalUsers,
      totalImages,
      recentPosts,
      rawPageViews,
      maintenanceLogs,
      latestSettingsUpdate,
      latestPostUpdate,
      latestProjectUpdate,
      latestImageUpdate,
      recentActivities
    ] = await Promise.all([
      prisma.post.count(),
      prisma.project.count({ where: { published: true } }),
      prisma.message.count({ where: { read: false } }),
      prisma.user.count(),
      prisma.galleryImage.count(),
      prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }),
      prisma.pageView.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true }
      }),
      prisma.maintenanceLog.findMany(),
      prisma.generalSettings.findFirst({ select: { updatedAt: true } }),
      prisma.post.findFirst({ orderBy: { updatedAt: 'desc' }, select: { updatedAt: true } }),
      prisma.project.findFirst({ orderBy: { updatedAt: 'desc' }, select: { updatedAt: true } }),
      prisma.galleryImage.findFirst({ orderBy: { createdAt: 'desc' }, select: { createdAt: true } }),
      prisma.activity.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { user: { select: { name: true, image: true, email: true } } }
      }).catch(() => []) // Guard in case activity logs don't exist yet
    ]);

    console.log("Successfully fetched all DB data");

    const pageViewsByDay = rawPageViews.reduce((acc: Record<string, number>, view) => {
      const dayName = view.createdAt.toLocaleDateString('en-US', { weekday: 'short' });
      acc[dayName] = (acc[dayName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      return {
        name: dayName,
        visitors: pageViewsByDay[dayName] || 0
      };
    });

    console.log("Chart data generated:", chartData);

    // Calculate day counter statistics
    const now = new Date();
    const launchDate = settings?.launchedAt || now;
    
    const ageMs = Math.max(0, now.getTime() - launchDate.getTime());
    const websiteAgeDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

    console.log("Age calculations completed. launchDate:", launchDate, "ageMs:", ageMs, "websiteAgeDays:", websiteAgeDays);

    let maintenanceMs = 0;
    for (const log of maintenanceLogs) {
      const start = log.enabledAt.getTime();
      const end = log.disabledAt ? log.disabledAt.getTime() : now.getTime();
      maintenanceMs += Math.max(0, end - start);
    }
    
    const maintenanceDaysRaw = maintenanceMs / (1000 * 60 * 60 * 24);
    const maintenanceDays = parseFloat(maintenanceDaysRaw.toFixed(1));
    
    const onlineDaysRaw = Math.max(0, ageMs - maintenanceMs) / (1000 * 60 * 60 * 24);
    const onlineDays = parseFloat(onlineDaysRaw.toFixed(1));

    console.log("Maintenance calculations: maintenanceDays:", maintenanceDays, "onlineDays:", onlineDays);

    const isMaintenanceActive = settings?.maintenanceEnabled || false;
    const currentStatus = isMaintenanceActive ? "Maintenance Mode" : "Online";

    const modificationDates = [
      latestSettingsUpdate?.updatedAt,
      latestPostUpdate?.updatedAt,
      latestProjectUpdate?.updatedAt,
      latestImageUpdate?.createdAt,
    ].filter(Boolean) as Date[];
    
    const lastUpdated = modificationDates.length > 0 
      ? new Date(Math.max(...modificationDates.map(d => d.getTime()))) 
      : now;

    console.log("Last modified calculation completed. modificationDates:", modificationDates, "lastUpdated:", lastUpdated);

    const formattedLaunchDate = launchDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const formattedLastUpdated = lastUpdated.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

    console.log("Formatted dates: launch:", formattedLaunchDate, "lastUpdated:", formattedLastUpdated);

    // Activity printing
    const fallbackActivities = [
      {
        id: "fallback-1",
        user: { name: "System Orchestrator" },
        type: "BACKUP_AUTO",
        details: "Database backup auto-generated and stored in PostgreSQL schema.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ];

    const displayedActivities = recentActivities.length > 0 ? recentActivities : fallbackActivities;
    console.log("Activities to display:", displayedActivities.length);

    console.log("All component rendering logic ran successfully!");
  } catch (err: any) {
    console.error("❌ Component crash during simulation:", err.stack || err);
  }
  
  await prisma.$disconnect();
}

run();
