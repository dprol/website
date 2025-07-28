import { parseArgs } from "node:util";
import { exec } from "node:child_process";
import { blogPosts } from "./common";

const { values } = parseArgs({ options: { post: { type: "string" } } });
const { post: name } = values;

if (name === undefined) {
  console.log("Available blog posts:");
  Object.entries(blogPosts).forEach(([key, post]) => {
    console.log(`  ${key}: ${post.title}`);
    console.log(`    → ${post.href}`);
  });
  console.log("\nUsage: npm run dev --post=<post-name>");
  process.exit(1);
}

const blogPost = blogPosts[name];
if (!blogPost) {
  console.error(`❌ Blog post "${name}" not found`);
  console.log("\nAvailable posts:");
  Object.keys(blogPosts).forEach(key => console.log(`  - ${key}`));
  process.exit(1);
}

console.log(`📖 Opening: ${blogPost.title}`);
console.log(`🔗 URL: ${blogPost.href}`);

// Open the external URL in the default browser
const command = process.platform === 'darwin' ? 'open' : 
               process.platform === 'win32' ? 'start' : 'xdg-open';

exec(`${command} "${blogPost.href}"`, (error) => {
  if (error) {
    console.error('❌ Failed to open browser:', error.message);
    console.log('📋 Please manually open:', blogPost.href);
    process.exit(1);
  } else {
    console.log('✅ Opened in browser successfully');
    process.exit(0);
  }
});