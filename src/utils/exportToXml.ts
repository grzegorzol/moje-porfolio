import { supabase } from "@/integrations/supabase/client";
import { projects, services, blogPosts as staticBlogPosts, blogCategories, projectCategories } from "@/data/portfolioData";

interface ExportData {
  siteInfo: {
    name: string;
    description: string;
    exportDate: string;
  };
  projects: typeof projects;
  services: typeof services;
  staticBlogPosts: typeof staticBlogPosts;
  categories: {
    blog: typeof blogCategories;
    projects: typeof projectCategories;
  };
  dynamicContent: {
    blogPosts: any[];
    pages: any[];
    siteSettings: any[];
  };
}

const escapeXml = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const convertToXml = (data: ExportData): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<website>\n';

  // Site Info
  xml += '  <siteInfo>\n';
  xml += `    <name>${escapeXml(data.siteInfo.name)}</name>\n`;
  xml += `    <description>${escapeXml(data.siteInfo.description)}</description>\n`;
  xml += `    <exportDate>${escapeXml(data.siteInfo.exportDate)}</exportDate>\n`;
  xml += '  </siteInfo>\n';

  // Projects
  xml += '  <projects>\n';
  for (const project of data.projects) {
    xml += '    <project>\n';
    xml += `      <id>${escapeXml(project.id)}</id>\n`;
    xml += `      <title>${escapeXml(project.title)}</title>\n`;
    xml += `      <description>${escapeXml(project.description)}</description>\n`;
    xml += `      <category>${escapeXml(project.category)}</category>\n`;
    xml += `      <image>${escapeXml(project.image)}</image>\n`;
    xml += '      <tags>\n';
    for (const tag of project.tags) {
      xml += `        <tag>${escapeXml(tag)}</tag>\n`;
    }
    xml += '      </tags>\n';
    xml += '    </project>\n';
  }
  xml += '  </projects>\n';

  // Services
  xml += '  <services>\n';
  for (const service of data.services) {
    xml += '    <service>\n';
    xml += `      <id>${escapeXml(service.id)}</id>\n`;
    xml += `      <title>${escapeXml(service.title)}</title>\n`;
    xml += `      <description>${escapeXml(service.description)}</description>\n`;
    xml += `      <icon>${escapeXml(service.icon)}</icon>\n`;
    xml += '      <features>\n';
    for (const feature of service.features) {
      xml += `        <feature>${escapeXml(feature)}</feature>\n`;
    }
    xml += '      </features>\n';
    xml += '    </service>\n';
  }
  xml += '  </services>\n';

  // Static Blog Posts
  xml += '  <staticBlogPosts>\n';
  for (const post of data.staticBlogPosts) {
    xml += '    <blogPost>\n';
    xml += `      <id>${escapeXml(post.id)}</id>\n`;
    xml += `      <title>${escapeXml(post.title)}</title>\n`;
    xml += `      <excerpt>${escapeXml(post.excerpt)}</excerpt>\n`;
    xml += `      <content>${escapeXml(post.content)}</content>\n`;
    xml += `      <category>${escapeXml(post.category)}</category>\n`;
    xml += `      <categoryLabel>${escapeXml(post.categoryLabel)}</categoryLabel>\n`;
    xml += `      <image>${escapeXml(post.image)}</image>\n`;
    xml += `      <date>${escapeXml(post.date)}</date>\n`;
    xml += `      <readTime>${escapeXml(post.readTime)}</readTime>\n`;
    xml += '    </blogPost>\n';
  }
  xml += '  </staticBlogPosts>\n';

  // Categories
  xml += '  <categories>\n';
  xml += '    <blogCategories>\n';
  for (const cat of data.categories.blog) {
    xml += `      <category id="${escapeXml(cat.id)}" slug="${escapeXml(cat.slug)}">${escapeXml(cat.label)}</category>\n`;
  }
  xml += '    </blogCategories>\n';
  xml += '    <projectCategories>\n';
  for (const cat of data.categories.projects) {
    xml += `      <category id="${escapeXml(cat.id)}">${escapeXml(cat.label)}</category>\n`;
  }
  xml += '    </projectCategories>\n';
  xml += '  </categories>\n';

  // Dynamic Content from Database
  xml += '  <dynamicContent>\n';

  // Database Blog Posts
  xml += '    <databaseBlogPosts>\n';
  for (const post of data.dynamicContent.blogPosts) {
    xml += '      <blogPost>\n';
    xml += `        <id>${escapeXml(post.id)}</id>\n`;
    xml += `        <title>${escapeXml(post.title)}</title>\n`;
    xml += `        <slug>${escapeXml(post.slug)}</slug>\n`;
    xml += `        <excerpt>${escapeXml(post.excerpt || "")}</excerpt>\n`;
    xml += `        <content><![CDATA[${JSON.stringify(post.content)}]]></content>\n`;
    xml += `        <category>${escapeXml(post.category || "")}</category>\n`;
    xml += `        <status>${escapeXml(post.status || "")}</status>\n`;
    xml += `        <featuredImage>${escapeXml(post.featured_image || "")}</featuredImage>\n`;
    xml += `        <readTime>${post.read_time || 0}</readTime>\n`;
    xml += `        <publishedAt>${escapeXml(post.published_at || "")}</publishedAt>\n`;
    xml += `        <createdAt>${escapeXml(post.created_at || "")}</createdAt>\n`;
    if (post.tags && post.tags.length > 0) {
      xml += '        <tags>\n';
      for (const tag of post.tags) {
        xml += `          <tag>${escapeXml(tag)}</tag>\n`;
      }
      xml += '        </tags>\n';
    }
    xml += '      </blogPost>\n';
  }
  xml += '    </databaseBlogPosts>\n';

  // Database Pages
  xml += '    <pages>\n';
  for (const page of data.dynamicContent.pages) {
    xml += '      <page>\n';
    xml += `        <id>${escapeXml(page.id)}</id>\n`;
    xml += `        <title>${escapeXml(page.title)}</title>\n`;
    xml += `        <slug>${escapeXml(page.slug)}</slug>\n`;
    xml += `        <content><![CDATA[${JSON.stringify(page.content)}]]></content>\n`;
    xml += `        <metaDescription>${escapeXml(page.meta_description || "")}</metaDescription>\n`;
    xml += `        <metaKeywords>${escapeXml(page.meta_keywords || "")}</metaKeywords>\n`;
    xml += `        <status>${escapeXml(page.status || "")}</status>\n`;
    xml += `        <featuredImage>${escapeXml(page.featured_image || "")}</featuredImage>\n`;
    xml += `        <sortOrder>${page.sort_order || 0}</sortOrder>\n`;
    xml += `        <createdAt>${escapeXml(page.created_at || "")}</createdAt>\n`;
    xml += '      </page>\n';
  }
  xml += '    </pages>\n';

  // Site Settings
  xml += '    <siteSettings>\n';
  for (const setting of data.dynamicContent.siteSettings) {
    xml += '      <setting>\n';
    xml += `        <key>${escapeXml(setting.key)}</key>\n`;
    xml += `        <value><![CDATA[${JSON.stringify(setting.value)}]]></value>\n`;
    xml += '      </setting>\n';
  }
  xml += '    </siteSettings>\n';

  xml += '  </dynamicContent>\n';
  xml += '</website>';

  return xml;
};

export const exportWebsiteToXml = async (): Promise<string> => {
  // Fetch dynamic content from database
  const [blogPostsResult, pagesResult, settingsResult] = await Promise.all([
    supabase.from("blog_posts").select("*"),
    supabase.from("pages").select("*"),
    supabase.from("site_settings").select("*"),
  ]);

  const exportData: ExportData = {
    siteInfo: {
      name: "Portfolio CMS - Grzegorz Rogala",
      description: "Strona portfolio z systemem zarządzania treścią",
      exportDate: new Date().toISOString(),
    },
    projects,
    services,
    staticBlogPosts,
    categories: {
      blog: blogCategories,
      projects: projectCategories,
    },
    dynamicContent: {
      blogPosts: blogPostsResult.data || [],
      pages: pagesResult.data || [],
      siteSettings: settingsResult.data || [],
    },
  };

  return convertToXml(exportData);
};

export const downloadXml = (xmlContent: string, filename: string = "website-export.xml") => {
  const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
