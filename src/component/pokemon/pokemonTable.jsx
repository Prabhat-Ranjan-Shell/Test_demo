import React, { useState, useEffect, Fragment } from 'react';

const PokemonTable = () => {
    const [list, setList] = useState([]);
    const [abilities, setAbilities] = useState({});

    const fetchAbilities = async (name, url) => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            setAbilities(prev => ({ ...prev, [name]: result.abilities }));
        } catch (error) {
            throw new Error(error);
        }
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            setList(result.results);
            result.results.forEach((item) => {
                fetchAbilities(item.name, item.url);
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        fetchData('https://pokeapi.co/api/v2/pokemon/');
    }, []);

    console.log(list, abilities);
    return <div>
        {Object.keys(abilities).map(pokemon => <Fragment key={pokemon}>
            <h3>{`${pokemon}`}</h3>
            <table>
                <thead>
                    <th>Ability</th>
                    <th>IsHidden</th>
                    <th>Slot</th>
                </thead>
                {abilities[pokemon].map(item => <tbody key={item.ability.name}>
                    <td>{item.ability.name}</td>
                    <td>{item.is_hidden ? 1 : 0}</td>
                    <td>{item.slot}</td>
                </tbody>)}
            </table></Fragment>
        )}
    </div>;
};

export default PokemonTable;
