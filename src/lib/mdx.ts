import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  icon?: string; 
  slug: string;
}

const rootDirectory = path.join(process.cwd(), "src", "content", "blog");

// Wrap in cache() to memoize the result
export const getPostBySlug = cache((slug: string): { meta: PostMeta; content: string } => {
  if (!slug) {
    throw new Error("A valid slug must be provided.");
  }
  
  const realSlug = String(slug).replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  
  const { data, content } = matter(fileContent);

  const meta: PostMeta = {
    title: data.title,
    description: data.description,
    date: data.date,
    coverImage: data.coverImage,
    icon: data.icon || null, 
    slug: realSlug,
  };

  return { meta, content };
});

// Wrap in cache() to memoize the result
export const getAllPostsMeta = cache((): PostMeta[] => {
  const files = fs.readdirSync(rootDirectory);
  
  return files.map((fileName) => {
    const filePath = path.join(rootDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    
    return {
      title: data.title,
      description: data.description,
      date: data.date,
      coverImage: data.coverImage,
      icon: data.icon || null, 
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
});