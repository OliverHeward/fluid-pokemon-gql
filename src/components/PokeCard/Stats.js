import React from "react";
import styled from "styled-components";
import { sanitizeSentenceCase } from "../../shared/utility";

const StatsStyled = styled.li`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 32% 60% auto;
  align-items: center;
  grid-gap: 8px;
  border-bottom: 1px dashed var(--grey);
  .range {
    position: relative;
    overflow: hidden;
  }
  .stat-range {
    width: 100%;
    display: block;
    height: 3px;
    background: var(--grey);
  }
  .stat-range-applied {
    position: absolute;
    left: 0;
    top: 0;
    height: 3px;
    &.hp {
      background: #94faab;
    }
    &.attack {
      background: var(--red);
    }
    &.defense {
      background: var(--blue);
    }
    &.special-attack {
      background: #4ddbfd;
    }
    &.special-defense {
      background: #f6de57;
    }
    &.speed {
      background: #e900b6;
    }
  }
`;

const Stats = ({ base_stat, stat }) => {
  return (
    <StatsStyled>
      <span className="stat-type">{sanitizeSentenceCase(stat.name)}</span>
      <div className="range">
        <span className="stat-range"></span>
        <span
          className={`stat-range-applied ${stat.name} `}
          style={{ width: base_stat + "%" }}
        ></span>
      </div>
      <span className="stat-number bold">{base_stat}</span>
    </StatsStyled>
  );
};

export default Stats;
