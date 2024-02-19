module.exports = function(context, options) {
  return {
    name: 'docusaurus-plugin-csp',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              'http-equiv': 'Content-Security-Policy',
              content: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src 'self' https://grafana-lake.demo.devlake.io/;",
            },
          },
        ],
      };
    },
  };
};