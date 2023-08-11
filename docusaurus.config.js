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
  title: 'Apache DevLake - Open-Source Dev Data Platform for Productivity',
  tagline: 'Apache DevLake is an open-source platform that integrates and analyzes data from DevOps tools to provide insights for engineering productivity, DORA metrics, and more.',
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
            theme: { light: 'neutral', dark: 'forest' }
          }]],
          rehypePlugins: [katex],
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next',
              path: '',
              banner: 'none',
            },
            "v0.18":{
              banner: 'none',
            },
            "v0.17":{
              banner: 'none',
            },
            "v0.16":{
              banner: 'none',
            },
            "v0.15":{
              banner: 'none',
            },
            "v0.14":{
              banner: 'none',
            },
            "v0.13":{
              banner: 'none',
            },
            "v0.12":{
              banner: 'none',
            },
            "v0.11":{
              banner: 'none',
            }
          }
        },
        gtag: {
          trackingID: 'G-PKZLL38MQG',
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          // Please change this to your repo.
          editUrl: 'https://github.com/apache/incubator-devlake-website/edit/main',
          remarkPlugins: [math, [require('mdx-mermaid'), {
            theme: { light: 'neutral', dark: 'forest' }
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'livedemo',
        path: 'livedemo',
        routeBasePath: 'livedemo',
        sidebarPath: require.resolve('./sidebarsLivedemo.js'),
      },
    ],
    function tailwindcss() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          // @ts-ignore
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          postcssOptions.plugins.push(require('postcss-gap-properties'));
          return postcssOptions;
        },
      };
    },
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
    (
      {
      metadata: [{name: 'keywords', content: 'Engineering Productivity, Open-Source Engineering, Open-Source Integration Tools, Data Integrates Platform, Open-Source Dev Platform, Open-Source Data Integrates, DevOps Tools Integrates, Open-Source DevOps Tools'}],
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
                label: "Next",
                to: "/docs/Overview/Introduction"
              },
              {
                label: versions[0] + ' (Beta)',
                to: "/docs/"+versions[0]+"/Overview/Introduction"
              },
              {
                label: versions[1] + ' (Stable)',
                to: "/docs/"+versions[1]+"/Overview/Introduction"
              },
              ...versions.slice(2, versions.length).map((version) => ({
                label: version,
                to: `docs/${version}/Overview/Introduction`,
              }))
            ]
          },
          {
            type: 'doc',
            position: 'right',
            label: 'Use Cases',
            to: 'livedemo',
            docsPluginId: 'livedemo',
            docId: 'EngineeringLeads/DORA',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'right',
            label: 'Community',
            docsPluginId: 'community'
          },
          {
            to: '/team',
            label: 'Team',
            position: 'right'
          },
          {
            to: '/blogOverview',
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
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: 'docs/GettingStarted',
              },
              {
                label: 'Data Models',
                to: 'docs/DataModels/DevLakeDomainLayerSchema',
              },
              {
                label: 'Engineering Metrics',
                to: 'docs/Metrics',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                to: 'https://join.slack.com/t/devlake-io/shared_invite/zt-20envwfbk-JUTZ4z9jSeRnrvNhBFLg9w',
              },
              {
                label: 'GitHub Issue Tracker',
                to: 'https://github.com/apache/incubator-devlake/issues',
              },
              {
                label: 'GitHub Issue Tracker For Docs',
                to: 'https://github.com/apache/incubator-devlake-website/issues',
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
              {
                label: 'Twitter',
                to: 'https://twitter.com/ApacheDevLake',
              },
              {
                label: 'Trademark Guidelines',
                to: 'community/trademark',
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
