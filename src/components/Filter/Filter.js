import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addFilter, removeFilter } from "../../app/pokemonSlice";
import { updateObject } from "../../shared/utility";

const FilterStyled = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: calc(var(--spacing) * 8);

  max-width: 1200px;

  .filter-control {
    margin-bottom: calc(var(--spacing) * 2);
    cursor: pointer;
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }
  .filters {
    &.closed {
      display: none;
    }
    &.open {
      display: grid;
    }
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    grid-gap: var(--spacing);

    label {
      text-transform: capitalize;
    }

    label,
    input {
      cursor: pointer;
    }
  }
`;

const Filter = () => {
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState({
    normal: {
      type: "normal",
      checked: false,
    },
    fairy: {
      type: "fairy",
      checked: false,
    },
    fire: {
      type: "fire",
      checked: false,
    },
    fighting: {
      type: "fighting",
      checked: false,
    },
    water: {
      type: "water",
      checked: false,
    },
    poison: {
      type: "poison",
      checked: false,
    },
    grass: {
      type: "grass",
      checked: false,
    },
    ground: {
      type: "ground",
      checked: false,
    },
    electric: {
      type: "electric",
      checked: false,
    },
    flying: {
      type: "flying",
      checked: false,
    },
    ice: {
      type: "ice",
      checked: false,
    },
    psychic: {
      type: "psychic",
      checked: false,
    },
    ghost: {
      type: "ghost",
      checked: false,
    },
    bug: {
      type: "bug",
      checked: false,
    },
    dark: {
      type: "dark",
      checked: false,
    },
    rock: {
      type: "rock",
      checked: false,
    },
    dragon: {
      type: "dragon",
      checked: false,
    },
    steel: {
      type: "steel",
      checked: false,
    },
  });
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const inputChangedHandler = (type, key) => {
    const updatedControls = updateObject(filterState, {
      [key]: updateObject(filterState[key], {
        checked: !filterState[key].checked,
      }),
    });
    setFilterState(updatedControls);

    if (!filterState[key].checked) {
      dispatch(addFilter(type));
    } else {
      dispatch(removeFilter(type));
    }
  };

  const radioArray = [];
  for (let key in filterState) {
    radioArray.push({
      id: key,
      config: filterState[key],
    });
  }

  let radios = radioArray.map((radio) => {
    return (
      <label key={radio.id}>
        <input
          key={radio.id}
          type="radio"
          checked={radio.config.checked}
          onChange={() => inputChangedHandler(radio.config.type, radio.id)}
          onClick={() => inputChangedHandler(radio.config.type, radio.id)}
        />
        {radio.config.type}
      </label>
    );
  });

  return (
    <FilterStyled>
      <div className="filter-control bold" onClick={() => handleFilterOpen()}>
        <svg viewBox="0 0 46 30" width="28" height="24">
          <rect width="100" y="0" ry="2" rx="2" height="5"></rect>
          <rect y="11" ry="2" rx="2" x="8" width="30" height="5"></rect>
          <rect y="21" ry="2" rx="2" x="18" width="10" height="5"></rect>
        </svg>
        Filter Pokemon
      </div>
      <div className={`filters ${filterOpen ? "open" : "closed"}`}>
        {radios}
      </div>
    </FilterStyled>
  );
};

export default Filter;
