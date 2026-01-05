import lume from "lume/mod.ts";
import wiki from "wiki/mod.ts";
import metas from "lume/plugins/metas.ts";
import ogImages from "lume/plugins/og_images.ts";
import sitemap from "lume/plugins/sitemap.ts";
import mermaid from "jsr:@ooker777/lume-mermaid-plugin";
import checkUrls from "lume/plugins/check_urls.ts";

const markdown = {
  options: {
    breaks: true,
  },
};
const domain = Deno.readTextFileSync("CNAME")
const site = lume({
  src: "./docs",
  location: new URL(`https://${domain}`),
  server: {
    open: true,
  },
}, { markdown });


site.use(wiki({
  favicon: {
    input: "assets/favicon.svg"
  }
}));

site.use(ogImages());
site.use(metas());
site.use(sitemap());
site.use(mermaid())
site.use(checkUrls({
  output: "_broken_links.json",
}));

export default site;
