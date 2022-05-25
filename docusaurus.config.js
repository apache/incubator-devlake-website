const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
        },
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          // Please change this to your repo.
          editUrl:
            undefined,
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
    locales: ['en'],
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
            type: 'doc',
            docId: 'Overview/WhatIsDevLake',
            position: 'right',
            label: 'Docs',
          },
         {
            type: 'doc',
            docId: 'index',
            position: 'right',
            label: 'Community',
            docsPluginId: 'community'
          },
          {to: '/blog', label: 'Blog', position: 'right'},
          {
            href: 'https://github.com/apache/incubator-devlake/graphs/contributors',
            label: 'Team',
            position: 'right',
          },
          {
            href: 'https://github.com/merico-dev/lake',
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
                href: 'https://www.apache.org/',
              },
              {
                label: 'License',
                href: 'https://www.apache.org/licenses/',
              },
              {
                label: 'Security',
                href: 'https://www.apache.org/security/',
              },
              {
                label: 'Sponsorship',
                href: 'https://www.apache.org/foundation/sponsorship.html',
              },
              {
                label: 'Thanks',
                href: 'https://www.apache.org/foundation/thanks.html',
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
                label: 'Docs',
                to: '/docs/Overview/WhatIsDevLake',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/devlake-io/shared_invite/zt-17b6vuvps-x98pqseoUagM7EAmKC82xQ',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/merico-dev/lake',
              },
            ],
          },
        ],
        copyright: `
        <div style="margin-top: 20px">
                <img style="height:50px; margin-bottom: 10px; margin-top: 10px" alt="Apache Software Foundation" src= "/img/apache-incubator.svg" />
                <p style="color: #fff;font-weight:400;text-align:left">Apache DevLake is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p>
                <div style="border-top: 1px solid #fff;min-height: 60px;line-height: 20px;text-align: center;font-family: Avenir-Medium;font-size: 14px;color: #fff;display: flex;align-items: center;"><span>Copyright ©${new Date().getFullYear()} Apache, Apache DevLake, DevLake, the Apache feather logo and the Apache DevLake project logo are trademarks of The Apache Software Foundation.</span></div>
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
