import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Stats from "../components/PokeCard/Stats";
import { sanitizeSentenceCase, sanitizeString } from "../shared/utility";

const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const PokemonStyled = styled.div`
  padding: calc(var(--spacing) * 5) 0 120px;
  background: ${(props) => (props.type ? colors[props.type] : "var(--red)")};

  .header,
  .upper-pokemon,
  .lower-pokemon {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }

  .upper-pokemon,
  .lower-pokemon {
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.4));
  }

  .header {
    margin: 0 auto calc(var(--spacing) * 5);
    text-align: center;
    color: white;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));

    h1 {
      font-weight: 700;
    }
  }

  .upper-pokemon {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  .lower-pokemon {
    margin-top: calc(var(--spacing) * 3);
    background: white;
    padding: calc(var(--spacing) * 3);
    border-radius: 10px;
  }

  .gatsby-image-wrapper img {
    padding: calc(var(--spacing) * 4);
  }

  ul {
    list-style: none;
  }

  h1 {
    margin: 0;
  }

  h4 {
    font-weight: 700;
    margin-bottom: var(--spacing);
  }

  .lower-pokemon {
    .moves,
    .games {
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-flow: row wrap;
        grid-gap: 12px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .upper-pokemon {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const PokemonInfo = styled.div`
  background: white;
  border-radius: 10px;
  padding: calc(var(--spacing) * 2);
`;

const Pokemon = ({ data }) => {
  const { pokemon } = data;
  const image = getImage(pokemon.image.url);

  return (
    <PokemonStyled type={pokemon.types[0].type.name}>
      <div className="header">
        <h1 className="capitilize">{sanitizeString(pokemon.name)}</h1>
      </div>
      <div className="upper-pokemon">
        <GatsbyImage
          image={image}
          alt={`Picture of ${pokemon.name}`}
          objectFit="contain"
        />
        <PokemonInfo>
          <h3>
            Type:{" "}
            {pokemon.types.map((type) => (
              <span key={type.type.name}>
                {sanitizeString(type.type.name)} |{" "}
              </span>
            ))}
          </h3>
          <h3>
            Abilities:{" "}
            {pokemon.abilities.map((ability) => (
              <span key={ability.ability.name}>
                {sanitizeSentenceCase(ability.ability.name)} |{" "}
              </span>
            ))}
          </h3>

          <div className="stats">
            <ul>
              {pokemon.stats.map((stat) => (
                <Stats {...stat} />
              ))}
            </ul>
          </div>

          <div className="weight">
            <span>Weight: {pokemon.weight}</span>
          </div>
          <div className="base-experience">
            <span>Base Experience: {pokemon.base_experience}</span>
          </div>
        </PokemonInfo>
      </div>

      <div className="lower-pokemon">
        <div className="moves">
          <h4>Moves {sanitizeSentenceCase(pokemon.name)} has:</h4>
          <ul>
            {pokemon.moves.map((move) => (
              <li className="capitilize">
                {move.move.name.replace(/-/g, " ")}
              </li>
            ))}
          </ul>
        </div>

        <div className="games">
          <h4>Games {sanitizeSentenceCase(pokemon.name)} features in:</h4>
          <ul>
            {pokemon.game_indices.map((game) => (
              <li key={game.version.name}>
                {sanitizeSentenceCase(game.version.name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PokemonStyled>
  );
};

export default Pokemon;

export const query = graphql`
  query PokemonQuery($name: String) {
    pokemon(name: { eq: $name }) {
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
      moves {
        move {
          name
        }
      }
      base_experience
      game_indices {
        version {
          name
        }
      }
      held_items {
        item {
          name
        }
      }
      weight
      image {
        url {
          childImageSharp {
            gatsbyImageData(width: 600)
          }
        }
      }
    }
  }
`;
