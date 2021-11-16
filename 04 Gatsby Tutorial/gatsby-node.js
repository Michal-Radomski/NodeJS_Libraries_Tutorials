const path = require("path");

// exports.createPages = ({boundActionCreators, graphql}) => {
//   const {createPage} = boundActionCreators;

//   const postTemplate = path.resolve("src/templates/BlogPost.jsx");

//   return graphql(`
//     {
//       allMarkdownRemark {
//         edges {
//           node {
//             html
//             id
//             frontmatter {
//               path
//               title
//               date
//               author
//             }
//           }
//         }
//       }
//     }
//   `).then((res) => {
//     if (res.errors) {
//       return Promise.reject(res.errors);
//     }

//     res.data.allMarkdownRemark.edges.forEach(({node}) => {
//       createPage({
//         path: node.frontmatter.path,
//         component: postTemplate,
//       });
//     });
//   });
// };

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const queryResults = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
              author
            }
          }
        }
      }
    }
  `);

  const postTemplate = path.resolve("src/templates/BlogPost.jsx");
  queryResults.data.allProducts.nodes.forEach((node) => {
    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
    });
  });
};
