export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ultimate-guide-seo-2026",
    title: "The Ultimate Guide to SEO in 2026: Strategies That Actually Work",
    excerpt: "Discover the latest SEO strategies that are driving real results in 2026. From AI-powered optimization to voice search, learn what's working now.",
    author: "SEOPulse Team",
    date: "March 10, 2026",
    readTime: "8 min read",
    category: "SEO Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    slug: "ai-content-optimization-secrets",
    title: "AI Content Optimization: 10 Secrets to Outrank Your Competition",
    excerpt: "Learn how artificial intelligence is transforming content optimization and how you can leverage AI tools to dominate search rankings.",
    author: "SEOPulse Team",
    date: "March 5, 2026",
    readTime: "9 min read",
    category: "AI & SEO",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    slug: "keyword-research-masterclass",
    title: "Keyword Research Masterclass: From Beginner to Expert in One Read",
    excerpt: "Master the art of keyword research with our comprehensive guide. Find untapped opportunities and build a keyword strategy that drives traffic.",
    author: "SEOPulse Team",
    date: "February 28, 2026",
    readTime: "10 min read",
    category: "Keywords",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  },
  {
    slug: "technical-seo-checklist",
    title: "The Complete Technical SEO Checklist for 2026: 50+ Action Items",
    excerpt: "A comprehensive technical SEO checklist covering site speed, crawlability, structured data, and everything you need for a technically sound website.",
    author: "SEOPulse Team",
    date: "February 20, 2026",
    readTime: "11 min read",
    category: "Technical SEO",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];
