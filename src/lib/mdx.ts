import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "src", "content", "blog");

export const getPostBySlug = (slug: string) => {
  if (!slug) {
    throw new Error("A valid slug must be provided to getPostBySlug.");
  }
  
  const realSlug = String(slug).replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  
  const { data, content } = matter(fileContent);

  return { meta: { ...data, slug: realSlug }, content };
};

export const getAllPostsMeta = () => {
  const files = fs.readdirSync(rootDirectory);
  const posts = files.map((fileName) => {
    const filePath = path.join(rootDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    
    return { ...data, slug: fileName.replace(/\.mdx$/, "") };
  });
  
  return posts;
};