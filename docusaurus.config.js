// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');
const versions = require('./versions.json');


// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Apache DevLake (Incubating)',
  tagline: 'Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.',
  url: 'https://devlake.apache.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/logo.svg',
  organizationName: 'Apache',
  projectName: 'Apache DevLake',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // set to undefined to remove Edit this Page
          editUrl: 'https://github.com/apache/incubator-devlake-website/edit/main',
          remarkPlugins: [math, [require('mdx-mermaid'), {
            theme: {light: 'neutral', dark: 'forest'}
          }]],
          rehypePlugins: [katex],
          versions: {
            current: {
              label: 'Latest',
              path: '',
              banner: 'none',
            },
            [versions[0]]: {
              path: versions[0],
            }
          }
        },
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          // Please change this to your repo.
          editUrl: 'https://github.com/apache/incubator-devlake-website/edit/main',
          remarkPlugins: [math, [require('mdx-mermaid'), {
            theme: {light: 'neutral', dark: 'forest'}
          }]],
          rehypePlugins: [katex],
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      // You can omit a locale (e.g. fr) if you don't need to override the defaults
      fa: {
        direction: 'rtl',
      },
    },
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Apache DevLake',
        logo: {
          alt: 'apache-devlake',
          src: 'img/logo.svg',
        },
        items: [
          {
            // type: 'doc',
            // docId: 'Overview/Introduction',
            position: 'right',
            label: 'Docs',
            items: [
              {
                label: "Latest",
                to: "/docs/Overview/Introduction",
              },
              ...versions.slice(0, versions.length - 2).map((version) => ({
                label: version,
                to: `docs/${version}/Overview/Introduction`,
              })),
              ...versions.slice(versions.length - 2, versions.length).map((version) => ({
                label: (version === "1.x") ? "1.x(Not Apache Release)" : version,
                to: `docs/${version}/Overview/Introduction`,
              }))
            ]
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'right',
            label: 'Community',
            docsPluginId: 'community'
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'right'
          },
          {
            to: 'https://github.com/apache/incubator-devlake',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'dropdown',
            label: 'ASF',
            position: 'right',
            items: [
              {
                label: 'Foundation',
                to: 'https://www.apache.org/',
              },
              {
                label: 'License',
                to: 'https://www.apache.org/licenses/',
              },
              {
                label: 'Events',
                to: 'https://www.apache.org/events/current-event',
              },
              {
                label: 'Security',
                to: 'https://www.apache.org/security/',
              },
              {
                label: 'Privacy',
                to: 'https://privacy.apache.org/policies/privacy-policy-public.html',
              },
              {
                label: 'Sponsorship',
                to: 'https://www.apache.org/foundation/sponsorship.html',
              },
              {
                label: 'Thanks',
                to: 'https://www.apache.org/foundation/thanks.html',
              }
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quick Start',
                to: 'docs/QuickStart/DockerComposeSetup',
              },
              {
                label: 'Data Models',
                to: 'docs/DataModels/DevLakeDomainLayerSchema',
              },
              {
                label: 'Engineering Metrics',
                to: 'docs/EngineeringMetrics',
              },
              {
                label: 'Dashboards (Live Demo)',
                to: 'docs/LiveDemo/GitHubBasic',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                to: 'https://join.slack.com/t/devlake-io/shared_invite/zt-17b6vuvps-x98pqseoUagM7EAmKC82xQ',
              },
              {
                label: 'GitHub Issue Tracker',
                to: 'https://github.com/apache/incubator-devlake/issues',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                to: 'https://github.com/apache/incubator-devlake',
              },
            ],
          },
        ],
        copyright: `
        <div style="margin-top: 20px">
          <a href="https://incubator.apache.org/" target="_blank"><img style="height:40px; margin-bottom: 10px; margin-top: 10px" alt="Apache Software Foundation" src= "/img/apache-incubator.svg" /></a>
          <p style="text-align:left; font-weight: 300; font-size: 0.8em;">Apache DevLake is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p>
          <p style="text-align:left; font-weight: 300; font-size: 0.8em;">Copyright ©${new Date().getFullYear()} Apache DevLake, DevLake, Apache, the Apache feather logo and the Apache DevLake project logo are either registered trademarks or trademarks of The Apache Software Foundation in the United States and other countries.</p>
        </div> 
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
