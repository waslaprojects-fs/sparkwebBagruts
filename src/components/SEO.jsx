import { useEffect } from "react";

const BASE_URL = "https://sparkbagrut.web.app";
const DEFAULT_OG_IMAGE_ALT = "شعار معهد سبارك الأكاديمي - تحضير بجروت الرياضيات والفيزياء";

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogImage = "/assets/logo512.png",
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  robots,
  breadcrumbs
}) {
  useEffect(() => {
    const baseTitle = "معهد سبارك الأكاديمي";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    
    document.title = fullTitle;
    
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    
    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    
    if (robots) {
      updateMetaTag("robots", robots);
    }
    
    if (description) {
      updateMetaTag("description", description);
      updatePropertyTag("og:description", description);
      updatePropertyTag("twitter:description", description);
    }
    
    if (title) {
      updatePropertyTag("og:title", fullTitle);
      updatePropertyTag("twitter:title", fullTitle);
    }
    
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }
    
    const imageUrl = ogImage.startsWith("http") 
      ? ogImage 
      : `https://sparkbagrut.web.app${ogImage}`;
    
    updatePropertyTag("og:image", imageUrl);
    updatePropertyTag("og:image:width", "512");
    updatePropertyTag("og:image:height", "512");
    updatePropertyTag("twitter:image", imageUrl);
    updateMetaTag("twitter:image:alt", ogImageAlt);
    
    updatePropertyTag("og:url", window.location.href);
    
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute("href", window.location.href);
    }

    let breadcrumbScript = document.getElementById("breadcrumb-schema");
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
        })),
      };
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement("script");
        breadcrumbScript.id = "breadcrumb-schema";
        breadcrumbScript.type = "application/ld+json";
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }
  }, [title, description, keywords, ogImage, ogImageAlt, robots, breadcrumbs]);
  
  return null;
}

