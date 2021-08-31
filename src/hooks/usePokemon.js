import { useStaticQuery, graphql } from "gatsby";

export default function usePokemon() {
  const data = useStaticQuery(graphql`
    query {
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
                gatsbyImageData(width: 200)
              }
            }
          }
          sprites {
            other {
              official_artwork {
                front_default
              }
            }
          }
        }
      }
    }
  `);

  const pokemon = data.allPokemon.nodes.map((node) => {
    const { id, name, types, abilities, stats, sprites } = node;

    return {
      id,
      name,
      types: types.map((type) => type.type.name),
      stats,
      abilities: abilities.map((ability) => ability.ability.name),
      image: sprites.other.official_artwork.front_default,
    };
  });

  return {
    pokemon,
  };
}
