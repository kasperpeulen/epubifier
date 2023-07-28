import { expect, test } from "vitest";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import { selectAll } from "hast-util-select";

test("get links from page", async () => {
  const html = await fetchHtml("https://pnpm.io/motivation");
  const tree = unified().use(rehypeParse).parse(html);
  const elements = selectAll("a", tree);
  const links = elements.map(({ properties }) => properties?.href);

  expect(links).toMatchInlineSnapshot(`
    [
      "#__docusaurus_skipToContent_fallback",
      "https://war.ukraine.ua/support-ukraine/",
      "/",
      "https://war.ukraine.ua/support-ukraine/",
      "/motivation",
      "/blog",
      "/faq",
      "/benchmarks",
      "/community/articles",
      "#",
      "/blog",
      "/faq",
      "/community/articles",
      "/benchmarks",
      "/motivation",
      "/next/motivation",
      "/motivation",
      "/7.x/motivation",
      "#",
      "/motivation",
      "/it/motivation",
      "/zh/motivation",
      "/ja/motivation",
      "/ko/motivation",
      "/pt/motivation",
      "/zh-TW/motivation",
      "/ru/motivation",
      "/fr/motivation",
      "/tr/motivation",
      "/es/motivation",
      "/id/motivation",
      "https://translate.pnpm.io",
      "#",
      "https://opencollective.com/pnpm",
      "https://github.com/sponsors/pnpm",
      "/crypto-donations",
      "https://github.com/pnpm/pnpm",
      "/motivation",
      "/motivation",
      "/installation",
      "/feature-comparison",
      "/pnpm-cli",
      "/cli/add",
      "/package_json",
      "/workspaces",
      "/using-changesets",
      "/errors",
      "/",
      "#saving-disk-space",
      "#boosting-installation-speed",
      "#creating-a-non-flat-node_modules-directory",
      "/blog/2020/05/27/flat-node-modules-is-not-the-only-way",
      "/symlinked-node-modules-structure",
      "/npmrc#node-linker",
      "https://github.com/pnpm/pnpm.io/edit/main/docs/motivation.md",
      "/installation",
      "#saving-disk-space",
      "#boosting-installation-speed",
      "#creating-a-non-flat-node_modules-directory",
      "/installation",
      "/pnpm-cli",
      "/workspaces",
      "/npmrc",
      "/users",
      "https://r.pnpm.io/chat",
      "https://twitter.com/pnpmjs",
      "https://fosstodon.org/@pnpm",
      "https://www.youtube.com/@pnpmjs",
      "https://stackoverflow.com/questions/tagged/pnpm",
      "https://reddit.com/r/pnpm/",
      "https://dev.to/t/pnpm/",
      "https://hashnode.com/n/pnpm",
      "https://keybase.io/pnpm",
      "https://github.com/pnpm/pnpm",
      "https://translate.pnpm.io",
      "https://stackshare.io/pnpm",
      "https://alternativeto.net/software/pnpm/about/",
    ]
  `);
});

async function fetchHtml(url: string) {
  let response = await fetch(url, { headers: { Accept: "text/html" } });
  if (!response.ok) throw response;
  return await response.text();
}
