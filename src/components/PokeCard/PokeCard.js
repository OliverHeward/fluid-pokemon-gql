import { Link } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import Rems from "../../styles/mixins/Rems";
import Stats from "./Stats";

const PokeCardStyled = styled.div`
  a {
    color: #000;
    text-decoration: none;
  }
  max-width: 380px;
  margin: 150px auto 0;
  width: 100%;
  z-index: 10;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1.01);
  }

  .pokemon-header {
    background: var(--light-green);
    height: 150px;
    position: relative;
    border-radius: var(--spacing) var(--spacing) 0 0;

    display: flex;
    align-items: center;
    justify-content: center;

    .gatsby-image-wrapper {
      position: absolute;
      bottom: 0;
    }
  }

  .pokemon-body {
    padding: var(--spacing);
    background: #fff;
    border-radius: 0 0 var(--spacing) var(--spacing);

    h3,
    h2 {
      margin: 0;
    }

    h2 {
      margin-bottom: var(--spacing);
    }

    .info-main {
      display: grid;
      grid-template-columns: 32% 70%;
      grid-gap: 8px;
      align-items: stretch;
      margin-bottom: var(--spacing);
    }

    .looped {
      height: 100%;
      display: flex;
      align-items: flex-end;
      grid-gap: 3px;
    }
  }

  span {
    ${Rems({ type: "font-size", size: 13 })};
  }
`;

const PokeCard = (props) => {
  const image = getImage(props.image.url);

  return (
    <PokeCardStyled>
      <Link to={`${props.name}`}>
        <div className="pokemon-header">
          <GatsbyImage image={image} alt={`picture of ${props.name}`} />
        </div>
        <div className="pokemon-body">
          <h2 className="capitilize">{props.name}</h2>
          <div className="info">
            <div className="info-main">
              <h3 className="bold">Type </h3>
              <div className="looped">
                {props.types.map((type) => (
                  <span className="capitilize">{type} | </span>
                ))}
              </div>
            </div>
            <div className="info-main">
              <h3 className="bold">Abilities </h3>
              <div className="looped">
                {props.abilities.map((ability) => (
                  <span className="capitilize">{ability} | </span>
                ))}
              </div>
            </div>
          </div>

          <div className="stats">
            <ul>
              {props.stats.map((stat) => (
                <Stats {...stat} />
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </PokeCardStyled>
  );
};

export default PokeCard;
