const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

const siteUrl = "https://peridot-smoky.vercel.app";

const links = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/login", changefreq: "monthly", priority: 0.8 },
  { url: "/register", changefreq: "monthly", priority: 0.8 },
  { url: "/users/me", changefreq: "daily", priority: 0.9 },
  { url: "/feed", changefreq: "daily", priority: 0.9 },
];

(async () => {
  const stream = new SitemapStream({ hostname: siteUrl });
  const sitemap = await streamToPromise(ReadableFromArray(links).pipe(stream)).then(data => data.toString());
  fs.writeFileSync("./public/sitemap.xml", sitemap);
  console.log("Sitemap gerado em public/sitemap.xml");
})();

function ReadableFromArray(array) {
  const { Readable } = require("stream");
  const readable = new Readable({ objectMode: true });
  array.forEach(item => readable.push(item));
  readable.push(null);
  return readable;
}
