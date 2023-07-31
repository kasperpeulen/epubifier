import { test, expect } from "vitest";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import { selectAll } from "hast-util-select";

test("get links from page", async () => {
  const html = await fetchHtml("https://pnpm.io/motivation");
  const tree = unified().use(rehypeParse).parse(html);

  // See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role
  const elements = selectAll("nav:has(a), [role=navigation]:has(a)", tree);
  const links = elements.map((node) => ({
    label: node.properties?.ariaLabel,
    links: selectAll("a", node).map(({ properties }) => properties?.href),
  }));

  expect(links).toMatchInlineSnapshot(`
    [
      {
        "label": "Main",
        "links": [
          "/",
          "https://war.ukraine.ua/support-ukraine/",
          "/motivation",
          "/blog",
          "/faq",
          "/benchmarks",
          "/community/articles",
          "/blog",
          "/faq",
          "/community/articles",
          "/benchmarks",
          "/next/motivation",
          "/motivation",
          "/7.x/motivation",
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
          "https://opencollective.com/pnpm",
          "https://github.com/sponsors/pnpm",
          "/crypto-donations",
          "https://github.com/pnpm/pnpm",
        ],
      },
      {
        "label": "Docs sidebar",
        "links": [
          "/motivation",
          "/motivation",
          "/installation",
          "/feature-comparison",
        ],
      },
      {
        "label": "Breadcrumbs",
        "links": [
          "/",
        ],
      },
      {
        "label": "Docs pages",
        "links": [
          "/installation",
        ],
      },
    ]
  `);
});

async function fetchHtml(url: string) {
  let response = await fetch(url, { headers: { Accept: "text/html" } });
  if (!response.ok) throw response;
  return await response.text();
}
