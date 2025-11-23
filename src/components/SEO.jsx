import { useEffect } from "react";

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogImage = "/assets/logo512.png"
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
    updatePropertyTag("twitter:image", imageUrl);
    
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute("href", window.location.href);
    }
  }, [title, description, keywords, ogImage]);
  
  return null;
}

