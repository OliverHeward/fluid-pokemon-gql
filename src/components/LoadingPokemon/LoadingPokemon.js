import React from 'react';
import styled from 'styled-components';
import Pokeball from '../../assets/svgs/Pokeball.svg';

const LoadingPokemonStyled = styled.div`
    background: var(--red);

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column nowrap;
        padding: calc(var(--spacing) * 5);
        min-height: calc(100vh - 400px);
        h2 {
            margin-top: 0;
        }
    }
`

const LoadingPokemon = () => {
    return (
        <LoadingPokemonStyled>
            <div className="container">
                <h2>Pokedex is loading...</h2>
                <Pokeball />
            </div>
        </LoadingPokemonStyled>
    );
};

export default LoadingPokemon;