module.exports = {
  siteMetadata: {
    // siteUrl: "https://www.yourdomain.tld",
    title: "Gatsby Tutorial",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-mdx",
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
      // __key: "pages",
    },
    "gatsby-transformer-remark",
  ],
};
