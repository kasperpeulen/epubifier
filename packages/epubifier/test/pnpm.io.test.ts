import { test, expect } from "vitest";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import { selectAll } from "hast-util-select";
import { toText } from "hast-util-to-text";

test("get links from page", async () => {
  const html = await fetchHtml("https://pnpm.io/motivation");
  const tree = unified().use(rehypeParse).parse(html);

  // See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role
  const elements = selectAll("nav:has(a), [role=navigation]:has(a)", tree);
  const links = elements.map((node) => ({
    label: node.properties?.ariaLabel,
    links: selectAll("a", node).map(({ properties, children }) => ({
      text: children.map((it) => toText(it)).join(" "),
      expanded: properties?.ariaExpanded,
      href: properties?.href,
    })),
  }));

  expect(links).toMatchInlineSnapshot(`
    [
      {
        "label": "Main",
        "links": [
          {
            "expanded": undefined,
            "href": "/",
            "text": " pnpm",
          },
          {
            "expanded": undefined,
            "href": "https://war.ukraine.ua/support-ukraine/",
            "text": "",
          },
          {
            "expanded": undefined,
            "href": "/motivation",
            "text": "Docs",
          },
          {
            "expanded": undefined,
            "href": "/blog",
            "text": "Blog",
          },
          {
            "expanded": undefined,
            "href": "/faq",
            "text": "FAQ",
          },
          {
            "expanded": undefined,
            "href": "/benchmarks",
            "text": "Benchmarks",
          },
          {
            "expanded": undefined,
            "href": "/community/articles",
            "text": "Community",
          },
          {
            "expanded": "false",
            "href": "#",
            "text": "More",
          },
          {
            "expanded": undefined,
            "href": "/blog",
            "text": "Blog",
          },
          {
            "expanded": undefined,
            "href": "/faq",
            "text": "FAQ",
          },
          {
            "expanded": undefined,
            "href": "/community/articles",
            "text": "Community",
          },
          {
            "expanded": undefined,
            "href": "/benchmarks",
            "text": "Benchmarks",
          },
          {
            "expanded": "false",
            "href": "/motivation",
            "text": "8.x",
          },
          {
            "expanded": undefined,
            "href": "/next/motivation",
            "text": "Next",
          },
          {
            "expanded": undefined,
            "href": "/motivation",
            "text": "8.x",
          },
          {
            "expanded": undefined,
            "href": "/7.x/motivation",
            "text": "7.x",
          },
          {
            "expanded": "false",
            "href": "#",
            "text": " English",
          },
          {
            "expanded": undefined,
            "href": "/motivation",
            "text": "English",
          },
          {
            "expanded": undefined,
            "href": "/it/motivation",
            "text": "Italiano (62%)",
          },
          {
            "expanded": undefined,
            "href": "/zh/motivation",
            "text": "简体中文 (83%)",
          },
          {
            "expanded": undefined,
            "href": "/ja/motivation",
            "text": "日本語 (86%)",
          },
          {
            "expanded": undefined,
            "href": "/ko/motivation",
            "text": "한국어 (64%)",
          },
          {
            "expanded": undefined,
            "href": "/pt/motivation",
            "text": "Português Brasileiro (55%)",
          },
          {
            "expanded": undefined,
            "href": "/zh-TW/motivation",
            "text": "正體中文 (43%)",
          },
          {
            "expanded": undefined,
            "href": "/ru/motivation",
            "text": "Русский (43%)",
          },
          {
            "expanded": undefined,
            "href": "/fr/motivation",
            "text": "Français (47%)",
          },
          {
            "expanded": undefined,
            "href": "/tr/motivation",
            "text": "Türkçe (27%)",
          },
          {
            "expanded": undefined,
            "href": "/es/motivation",
            "text": "Español (57%)",
          },
          {
            "expanded": undefined,
            "href": "/id/motivation",
            "text": "Bahasa Indonesia (27%)",
          },
          {
            "expanded": undefined,
            "href": "https://translate.pnpm.io",
            "text": "Help Us Translate",
          },
          {
            "expanded": "false",
            "href": "#",
            "text": "🧡 Sponsor Us",
          },
          {
            "expanded": undefined,
            "href": "https://opencollective.com/pnpm",
            "text": "Open Collective ",
          },
          {
            "expanded": undefined,
            "href": "https://github.com/sponsors/pnpm",
            "text": "GitHub Sponsors ",
          },
          {
            "expanded": undefined,
            "href": "/crypto-donations",
            "text": "Crypto Donations",
          },
          {
            "expanded": undefined,
            "href": "https://github.com/pnpm/pnpm",
            "text": "",
          },
        ],
      },
      {
        "label": "Docs sidebar",
        "links": [
          {
            "expanded": "true",
            "href": "/motivation",
            "text": "Introduction",
          },
          {
            "expanded": undefined,
            "href": "/motivation",
            "text": "Motivation",
          },
          {
            "expanded": undefined,
            "href": "/installation",
            "text": "Installation",
          },
          {
            "expanded": undefined,
            "href": "/feature-comparison",
            "text": "Feature Comparison",
          },
          {
            "expanded": "false",
            "href": "/pnpm-cli",
            "text": "Usage",
          },
          {
            "expanded": "false",
            "href": "/cli/add",
            "text": "CLI commands",
          },
          {
            "expanded": "false",
            "href": "/package_json",
            "text": "Configuration",
          },
          {
            "expanded": "false",
            "href": "/workspaces",
            "text": "Features",
          },
          {
            "expanded": "false",
            "href": "/using-changesets",
            "text": "Recipes",
          },
          {
            "expanded": "false",
            "href": "/errors",
            "text": "Advanced",
          },
        ],
      },
      {
        "label": "Breadcrumbs",
        "links": [
          {
            "expanded": undefined,
            "href": "/",
            "text": "",
          },
        ],
      },
      {
        "label": "Docs pages",
        "links": [
          {
            "expanded": undefined,
            "href": "/installation",
            "text": "Next Installation",
          },
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
