import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/SearchBar";

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 2) 0;
  grid-gap: var(--spacing);
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;

  p.lighter {
    color: var(--grey);
    line-height: 1.5;
  }

  h1 {
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    grid-gap: calc(var(--spacing) * 3);

    .copy-intro {
      max-width: 450px;
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyled>
      <div className="title-intro">
        <h1>
          Welcome <br /> to the <br /> <span className="bold">Pokedex.</span>
        </h1>
      </div>
      <div className="copy-intro">
        <p className="lighter">
          The comprehensive database of Pokemon from the original Blue and Red
          version.
        </p>
        <p>Find your favourite and check out their stats.</p>
        <SearchBar />
      </div>
    </HeaderStyled>
  );
};

export default Header;
