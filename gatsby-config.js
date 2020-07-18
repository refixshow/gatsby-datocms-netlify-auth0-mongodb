module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://keen-meitner-56c2e9.netlify.app/.netlify/identity`, // required!
      },
    },
  ],
}
