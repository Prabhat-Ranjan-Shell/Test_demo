import { useState, useEffect, useMemo } from 'react';

const cacheData = {};

function Pokemon() {
    const [list, setList] = useState({});
    const [pokemonData, setPokemonData] = useState({});
    // const [cacheData, setDataCatch] = 

    const dataFetch = (url, stateUpdate, cache) => {
        fetch(url)
            .then(item => item.json())
            .then(result => {
                if(cache) {
                    cacheData[cache] = result;
                }
                stateUpdate(result);
            })
            .catch(err => { throw new Error(err) })
    }

    useEffect(() => {
        dataFetch('https://pokeapi.co/api/v2/pokemon/', setList);
    }, []);

    const handleSelection = (options) => {
        const opt = JSON.parse(options);
        if(cacheData[opt.name]) {
            setPokemonData(cacheData[opt.name]);
        } else {
            dataFetch(opt.url, setPokemonData, opt.name);
        }
    };

    return <div>
        <label htmlFor="pokemon">Choose a pokemon: </label>
        <select name="pokemon" id="pokemon" onChange={(e) => handleSelection(e.target.value)}>
            {list?.results?.map(ele => <option key={ele.name} value={JSON.stringify(ele)}>{ele.name}</option>)}
        </select>
        <div>
           {pokemonData?.abilities?.map(ele => <p key={ele.ability.name}>{ele.ability.name}</p>)}
           <p>{pokemonData?.height}</p>
        </div>
    </div>
}

export default Pokemon;