import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Constant } from "../Constant";

const MyPokemonListComponent = () => {

    const history = useHistory();
    const [myPokemon, setMyPokemon] = useState([]);
    const [currentPokemon, setCurrenPokemon] = useState(null);
    
    useEffect(()=> {
        if(!currentPokemon) setAllMyPokemon();
        if(currentPokemon) setMyPokemon(currentPokemon);
    }, [currentPokemon])
    
    const setAllMyPokemon = () => {
        console.log('ini my allpokemon');
        console.log(localStorage.getItem('myPokemon'));
        var current = JSON.parse(localStorage.getItem('myPokemon'));
        setCurrenPokemon(current ? current : []);
    }

    const toPokemonDetail = (pokemon) => {
        history.push(Constant.pokemonDtailPath+pokemon.name)
    }

    return (
        <div>
            <h1 className='text-center'>My Pokemon</h1>
            <div className='M-15px Ct-Md'>
                <div className='row'>
                    {
                        myPokemon.map(poke => {
                            return(
                                <div className='card col-sm-3 M-15px' key={poke.name} onClick={() => toPokemonDetail(poke)}>
                                    <div className='row Cp card-img-top'>
                                        <div className='col-sm-4'><img src={poke.sprites[0]} alt=''/></div>
                                        <div className='col-sm-8'>
                                            <h4>{poke.name}</h4>
                                            <label>{poke.nickName}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MyPokemonListComponent;