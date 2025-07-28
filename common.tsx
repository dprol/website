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

// Node.js equivalent of Bun's importText
const importText = async (filename: string): Promise<string> => {
  return await fs.readFile(filename, 'utf-8');
};

// Node.js equivalent of Bun.escapeHTML
const escapeHTML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Node.js equivalent of Bun.write
const writeFile = async (filePath: string, data: string | Uint8Array | Blob): Promise<void> => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  
  if (data instanceof Blob) {
    const arrayBuffer = await data.arrayBuffer();
    await fs.writeFile(filePath, new Uint8Array(arrayBuffer));
  } else {
    await fs.writeFile(filePath, data);
  }
};

// Node.js equivalent of Bun.file().copyTo()
const copyFile = async (src: string, dest: string): Promise<void> => {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
};

// Node.js equivalent of fs.exists (deprecated but used in original)
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
}

export const blogPosts: Record<string, BlogPost> = {
  autodiff: { title: "Differentiable Programming in General" },
  "incremental-parsing": {
    title: "How much faster is incremental parsing, really?",
  },
  "linked-lists": { title: "How much slower are linked lists, really?" },
  "random-access": {
    date: "2025-06-23",
    title: "How much slower is random access, really?",
  },
  "typst-impressions": {
    date: "2025-03-27",
    title: "First impressions with Typst",
  },
  "random-integers": {
    date: "2024-10-20",
    title: "How can computers roll dice?",
  },
  "parallelizing-nvcc": { date: "2021-02-20", title: "Parallelizing nvcc" },
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
    png: new Blob([
      new Resvg(svg, { fitTo: { mode: "width", value: 192 } }).render().asPng(),
    ]),
  };
};

const generate = async () => {
  for (const file of ["all.css", "blog.css", "index.css", "photo.jpg"]) {
    await copyFile(`src/${file}`, `${out}/${file}`);
  }

  const { svg, png } = logo();
  await writeFile(`${out}/logo.svg`, svg);
  await writeFile(`${out}/icon.png`, png);

  await writeFile(
    `${out}/index.html`,
    await renderHtml(
      indexHtml({
        pubs: publications(),
        blog: (
          <ul>
            {Object.entries(blogPosts)
              .filter(([_, { date }]) => date !== undefined)
              .map(([id, { date, title }]) => {
                const name = escapeHTML(title);
                return (
                  <li>
                    {date} <a href={`/blog/${id}/`}>{name}</a>
                  </li>
                );
              })}
          </ul>
        ),
      }),
    ),
  );

  for (const [name, { date, title }] of Object.entries(blogPosts)) {
    try {
      await fs.cp(`src/blog/${name}/assets`, `${out}/blog/${name}/assets`, {
        recursive: true,
      });
    } catch (_) {}
    const body = (
      <div
        dangerouslySetInnerHTML={{
          __html: await getBlogPostBody(md, name),
        }}
      ></div>
    );
    const style = `src/blog/${name}/style.css`;
    const css = await exists(style);
    if (css) await fs.cp(style, `${out}/blog/${name}/style.css`);
    await writeFile(
      `${out}/blog/${name}/index.html`,
      await renderHtml(
        blogHtml({ css, date: date ?? "unpublished", title, body }),
      ),
    );
  }
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