import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getFilters } from "../../app/pokemonSlice";
import PokeCard from "../PokeCard/PokeCard";
import Rems from "../../styles/mixins/Rems";

import Pokedex from "../../assets/svgs/pokedex.svg";
import Pokeball from "../../assets/svgs/Pokeball.svg";

const PokemonListStyled = styled.div`
  position: relative;

  .button-container {
    position: absolute;
    bottom: calc(var(--spacing) * 3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    button {
      background: var(--black);
      cursor: pointer;
      color: white;
      border-radius: 20px;
      border: none;
      text-transform: uppercase;
      font-weight: 700;
      width: 90%;
      max-width: 350px;
      ${Rems({ type: "font-size", size: 18 })};
      padding: calc(var(--spacing) / 2) calc(var(--spacing) * 2);

      &.hide {
        display: none;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .button-container button {
      width: unset;
    }
  }
`;

const PokemonWrapper = styled.div`
  padding: 40px 5% 120px;
  position: relative;
  &:nth-of-type(odd) {
    background: var(--blue);
    .pokedex path {
      stroke: var(--red) !important;
    }
    .pokeball {
      &:first-of-type {
        bottom: 25px;
        left: -75px;
        transform: scaleX(-1);
      }
      &:last-of-type {
        bottom: 205px;
        right: -80px;
      }
    }
  }

  &:nth-of-type(even) {
    background: var(--red);
    .pokedex path {
      stroke: var(--blue) !important;
    }
    .pokeball {
      &:first-of-type {
        bottom: 25px;
        left: -75px;
        transform: scaleX(-1);
      }
      &:last-of-type {
        top: -90px;
        right: 20%;
      }
    }
  }

  .pokeball {
    position: absolute;
    z-index: 1;
  }

  .pokedex {
    position: absolute;
    top: -94px;
    max-width: 900px;
    width: 100%;
    left: 0;

    path {
      stroke-width: 2px;
    }
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
`;

const PokemonList = ({ allPokemon }) => {
  const { payload } = useSelector(getFilters);
  const [number, setNumber] = useState(6);

  const chunkArray = (array, chunk_size) => {
    var index = 0;
    var arrayLength = array.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      var myChunk = array.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const renderPokemon = () => {
    let filtered, arrayChunks;
    const resolvedNests = allPokemon.nodes.map((node) => {
      const { id, name, types, abilities, stats, image } = node;
      return {
        id,
        name,
        types: types.map((type) => type.type.name),
        stats,
        abilities: abilities.map((ability) => ability.ability.name),
        image,
      };
    });

    /* So this bit here is a bit weird...
      Due to the nesting of the objects and the types now in an array,
      I needed to loop over the filters, then filter the results
      this caused [Array, Array, ...] for filters as they are passed in
      so a new Set of unique objects is formed from the array once flattened
      this prevents duplicates of pokemon that are both for example, flying + fire (like charizard) */
    if (payload.pokemon.filters) {
      filtered = [
        ...new Set(
          payload.pokemon.filters
            .map((filter) => {
              return resolvedNests.filter((nest) =>
                nest.types.includes(filter)
              );
            })
            .flat()
        ),
      ];
    }
    // take the number from state - which is update from the button
    //  slice the array with this state
    // Show that no pokemon fit filter if none return
    arrayChunks = filtered.length
      ? chunkArray(filtered.slice(0, number), 3)
      : chunkArray(resolvedNests.slice(0, number), 3);

    return arrayChunks.map((chunk) => {
      console.log(chunk);
      return (
        <PokemonWrapper>
          <Pokedex className="pokedex" />
          <div className="container">
            <Pokeball className="pokeball" />
            {chunk.map((pokemon) => (
              <PokeCard key={pokemon.name} {...pokemon} />
            ))}
            <Pokeball className="pokeball" />
          </div>
        </PokemonWrapper>
      );
    });
  };

  const fetchMorePokemon = () => {
    setNumber(number + 6);
  };

  return (
    <PokemonListStyled>
      {renderPokemon()}
      <div className="button-container">
        <button
          className={`btn cta`}
          role="button"
          onClick={() => fetchMorePokemon()}
        >
          Load More
        </button>
      </div>
    </PokemonListStyled>
  );
};

export default PokemonList;
