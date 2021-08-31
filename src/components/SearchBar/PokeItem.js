import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import Rems from "../../styles/mixins/Rems";

const PokeItemStyled = styled(Link)`
  color: var(--black);
  display: flex;
  align-items: center;
  grid-gap: var(--spacing);
  text-decoration: none;
  padding: 5px;
  background: white;
  &:hover {
    background: var(--grey);
  }
  span {
    ${Rems({ type: "font-size", size: 24 })};
    text-transform: capitalize;
  }

  img {
    width: 55px;
  }
`;

const PokeItem = (props) => {
  const image = getImage(props.image.url);
  return (
    <PokeItemStyled to={`/` + props.name}>
      <GatsbyImage image={image} alt={`Picture of ${props.name}`} />
      <span>{props.name}</span>
    </PokeItemStyled>
  );
};

export default PokeItem;
