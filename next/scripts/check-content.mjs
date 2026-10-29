// Blocks Vercel production builds while content placeholders remain in content/.
// Local builds and preview deployments are left alone so the site can be worked on.
import { readdirSync, readFileSync } from "node:fs";

if (process.env.VERCEL_ENV !== "production") process.exit(0);

const dir = new URL("../content/", import.meta.url);
const marker = /\[(À REMPLIR|TO FILL)\]/;

const hits = readdirSync(dir)
  .filter((file) => file.endsWith(".ts"))
  .flatMap((file) =>
    readFileSync(new URL(file, dir), "utf8")
      .split("\n")
      .map((text, index) => ({ file, line: index + 1, text: text.trim() }))
      .filter(({ text }) => marker.test(text)),
  );

if (hits.length > 0) {
  console.error(`Contenu à compléter avant la mise en production (${hits.length}) :`);
  for (const { file, line, text } of hits) console.error(`  content/${file}:${line}  ${text}`);
  process.exit(1);
}
