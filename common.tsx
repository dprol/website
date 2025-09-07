import { Resvg } from "@resvg/resvg-js";
import hljs from "highlight.js";
import markdownit from "markdown-it";
import markdownitKatex from "markdown-it-katex";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { JSX } from "preact";
import { render } from "preact-render-to-string";
import prettier from "prettier";
import { Content } from "./blog";
import { Logo } from "./logo";
import { publications } from "./publications";
import { blogHtml, indexHtml } from "./templates";

const importText = async (filename: string): Promise<string> => {
  return await fs.readFile(filename, 'utf-8');
};

const escapeHTML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const writeFile = async (filePath: string, data: string | Uint8Array | Blob): Promise<void> => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  
  if (data instanceof Blob) {
    const arrayBuffer = await data.arrayBuffer();
    await fs.writeFile(filePath, new Uint8Array(arrayBuffer));
  } else {
    await fs.writeFile(filePath, data);
  }
};

const copyFile = async (src: string, dest: string): Promise<void> => {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
};

const exists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const renderHtml = async (element: JSX.Element): Promise<string> =>
  await prettier.format(`<!doctype html>\n${render(element)}`, {
    parser: "html",
  });

const out = "out";

const getBlogPostContent = async (
  name: string,
): Promise<Map<string, string>> => {
  if (!(await exists(`src/blog/${name}/content.tsx`))) return new Map();
  const content: Content = (await import(`./src/blog/${name}/content`)).content;
  return new Map(
    Object.entries(await content()).map(([k, v]) => [k, render(v)]),
  );
};

export const getBlogPostBody = async (
  md: markdownit,
  name: string,
): Promise<string> => {
  const replacements = await getBlogPostContent(name);
  const filename = `src/blog/${name}/index.md`;
  const markdown = (await importText(filename)).replaceAll(
    /^\{\{(\w+)\}\}$/gm,
    (_, key) => {
      const val = replacements.get(key);
      if (val === undefined) throw Error(`${filename} unknown key: ${key}`);
      return val;
    },
  );
  return md.render(markdown);
};

interface BlogPost {
  date?: string;
  title: string;
  href: string;
}

export const blogPosts: Record<string, BlogPost> = {
  "vibe-coding": { 
    title: "Vibe Coding Among CS Students",
    date: "2025-06-12",
    href: "https://medium.com/@dannyprol/vibe-coding-among-cs-students-68a8861df436"
  },
  "koli-calling": { 
    title: "Koli Calling 2024 Trip Report",
    date: "2024-11-17", 
    href: "https://blog.danielprol.com/posts/koli"
  },
  "future-software-development": {
    title: "The Future of Software Development and the Role of Computing Education with LLMs",
    date: "2024-05-22",
    href: "https://blog.danielprol.com/posts/dev-llm"
  },
  "ai-changed-coding": {
    title: "How AI changed the way we learn to code", 
    date: "2024-05-13",
    href: "https://blog.danielprol.com/posts/learning-code"
  },
  "podcasts": {
    title: "Podcasts",
    date: "2024-05-10",
    href: "https://blog.danielprol.com/posts/podcasts"
  }
};

export const md = markdownit({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (_) {}
    }
    return "";
  },
  html: true,
}).use(markdownitKatex);

export const logo = () => {
  const svg = render(<Logo />);
  return {
    svg,
  };
};

const generate = async () => {
  const staticFiles = ["all.css", "blog.css", "index.css", "photo.jpg"];
  
  for (const file of staticFiles) {
    try {
      if (await exists(`src/${file}`)) {
        await copyFile(`src/${file}`, `${out}/${file}`);
      } else {
        console.log(`Warning: src/${file} not found, skipping...`);
      }
    } catch (error) {
      console.log(`Warning: Could not copy src/${file}:`, String(error));
    }
  }

  const { svg } = logo();
  await writeFile(`${out}/logo.svg`, svg);

  if (await exists("src/photo.jpg")) {
    await copyFile("src/photo.jpg", `${out}/icon.jpg`);
    console.log("✅ Using photo.jpg as icon");
  } else {
    console.log("Warning: src/photo.jpg not found, no icon will be available");
  }

  // Fixed: properly filter and sort published posts
  const publishedPosts = Object.entries(blogPosts)
    .filter(([_, post]) => post.date !== undefined)
    .sort(([,a], [,b]) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

  await writeFile(
    `${out}/index.html`,
    await renderHtml(
      indexHtml({
        pubs: publications(),
        blog: (
          <ul>
            {publishedPosts.map(([id, post]) => {
              return (
                <li key={id}>
                  {post.date} <a href={post.href} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </li>
              );
            })}
          </ul>
        ),
      }),
    ),
  );

  console.log("✅ Generated index with external blog links");
};

export const build = async () => {
  await fs.rm(out, { force: true, recursive: true });
  await generate();
  const tmp = "tmp";
  const dist = "dist";
  try {
    await fs.rename(dist, tmp);
  } catch (_) {}
  await fs.rename(out, dist);
  await fs.rm(tmp, { force: true, recursive: true });
};