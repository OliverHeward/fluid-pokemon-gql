const { createRemoteFileNode } = require("gatsby-source-filesystem");
const fetch = require("node-fetch");
const path = require("path");
const NODE_TYPE = "Pokemon"; // the node type


// sourceNodes function to consume api and create nodes in graphql
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // Little cheat here - the first 151 pokemon are blue and red
  // If they weren't I'd have taken the full response, mapped over it, converted the property that held the games each pokemon is related to and turn them into an array to be easier iteratable - then filter it out only
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

  const json = await response.json();

  const { results = [] } = json;

  // Map through all pokemon and get all the data associated to them, the initial response only returns name + url for the entire pokemon data
  const pokemon = await Promise.all(
    results.map(async (result) => {
      const { url } = result;
      const pokeResponse = await fetch(url);
      return await pokeResponse.json();
    })
  );

  // foreach of the pokemon returned, create nodes for graphql
  pokemon.forEach((node, index) => {
    createNode({
      ...node,
      id: createNodeId(`${NODE_TYPE}-${node.id}`),
      parent: null,
      children: [],
      // store the image url on surface level of the node for easier usage.
      imgUrl: node.sprites.other["official-artwork"].front_default,
      internal: {
        type: NODE_TYPE, // We'll use this type during onCreateNode
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    });
  });
};


exports.createSchemaCustomization = async ({
  actions: { createTypes, printTypeDefinitions },
}) => {
  /**
   * Due to the way that the schemas work, when the node is generated
   *  it actually createds the Type of PokemonImage as url: String
   *  We need to edit this to make it url: File @link(by: "url") - url is the field we set earlier
   *    This will allow for the file to be sourced by gatsby-plugin-image
   * 
   */
  createTypes(`
    type Pokemon implements Node {
      image: PokemonImage
    }

    type PokemonImage @dontInfer {
      url: File @link(by: "url")
    }
  `);

  // Shows Type Definitions throughout App dumped into types.txt -> you need to delete this file or comment out the function on each run due to node not being able to overwrite a file that already exists. 
  // printTypeDefinitions({
  //   path: "./types.txt",
  // });
};

// When a node is created, this function will run
exports.onCreateNode = async ({
  node,
  actions: { createNode },
  createNodeId,
  cache,
  store,
}) => {
  /* If the Node that is being saved is "Pokemon" then we'll begin the image magic.
    url is the URL of the image data from the API - the Type on this will be converted from String -> File during createSchemaCustomization 
  */
  if (node.internal.type === NODE_TYPE) {
    node.image = await createRemoteFileNode({
      url: node.sprites.other["official-artwork"].front_default,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    });
  }
};


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const pokemonTemplate = path.resolve(`src/templates/pokemon.js`);
  const result = await graphql(`
    query loadPokemonQuery {
      allPokemon {
        edges {
          node {
            id
            name
            stats {
              base_stat
              stat {
                name
              }
            }
            abilities {
              ability {
                name
              }
            }
            types {
              type {
                name
              }
            }
            image {
              url {
                childImageSharp {
                  gatsbyImageData(width: 200)
                }
              }
            }
          }
        }
      }
    }
  `);
  result.data.allPokemon.edges.forEach((edge) => {
    createPage({
      path: `${edge.node.name}`,
      component: pokemonTemplate,
      context: {
        name: edge.node.name,
        id: edge.node.id,
      },
    });
  });
};
