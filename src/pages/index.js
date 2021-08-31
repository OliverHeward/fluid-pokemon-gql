import { graphql } from "gatsby";
import React from "react";
import Filter from "../components/Filter/Filter";
import Header from "../components/Header/Header";
import PokemonList from "../components/PokemonList/PokemonList";

const IndexPage = ({ data }) => {
  return (
    <div>
      <Filter />
      <PokemonList {...data} />
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query AllPokemonQuery {
    allPokemon {
      nodes {
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
              gatsbyImageData(width: 270)
            }
          }
        }
      }
    }
    listPokemon: allPokemon {
      nodes {
        id
        name
        image {
          url {
            childImageSharp {
              gatsbyImageData(width: 65)
            }
          }
        }
      }
    }
  }
`;
