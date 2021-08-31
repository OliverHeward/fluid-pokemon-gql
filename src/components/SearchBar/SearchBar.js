import React, { useState } from "react";
import PokeItem from "./PokeItem";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

const PokemonSearch = styled.div`
  position: relative;
  .list {
    position: absolute;
    z-index: 100;
    max-height: 450px;
    width: 100%;
    border-radius: 20px;
    overflow-y: scroll;
    box-shadow: 0px 5px 7px 1px rgba(0, 0, 0, 0.3);
    &.hide {
      display: none;
    }
    &.show {
      display: block;
    }
  }

  input {
    width: 100%;
    border-radius: 20px;
    border: 1px solid var(--grey);
    padding: calc(var(--spacing) / 2) var(--spacing);
    outline: none;

    &::placeholder {
      color: var(--grey);
    }
    &:focus,
    &:active {
      box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { listPokemon } = useStaticQuery(graphql`
    query Pokemon {
      listPokemon: allPokemon {
        edges {
          node {
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
    }
  `);

  const pokemonArray = () => {
    if (searchTerm.length === 0) {
      return listPokemon.edges;
    }

    return listPokemon.edges.filter((poke) => {
      const { node } = poke;
      let pokeLowerCase = node.name.toLowerCase();
      let searchLowerCase = searchTerm.toLowerCase();
      return pokeLowerCase.includes(searchLowerCase);
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const returnPokemon = pokemonArray();

  return (
    <PokemonSearch>
      <form>
        <div>
          <input
            id="Search"
            type="text"
            onChange={(event) => handleSearch(event)}
            value={searchTerm}
            autoComplete="off"
            placeholder="Search the Pokedex"
          />
        </div>
      </form>
      <div className={`list ${searchTerm ? "show" : "hide"}`}>
        {returnPokemon ? (
          returnPokemon.map((poke) => {
            return <PokeItem name={poke.node.name} image={poke.node.image} />;
          })
        ) : (
          <p>oops</p>
        )}
      </div>
    </PokemonSearch>
  );
};

export default SearchBar;
