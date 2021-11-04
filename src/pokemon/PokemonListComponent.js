import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Constant } from "../Constant";
import PokemonService from "./PokemonService";

const PokemonListComponent = () => {

    const history = useHistory();
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [limit] = useState(12);
    const [offset] = useState(0);

    useEffect(()=>{
        if(pokemonList.length < 1) getPokemonList();
    })

    const getPokemonList = () => {
        PokemonService.getPokemonList(offset, limit)
        .then(resp => {
            if(resp && resp.data) {
                setNextUrl(resp.data.next);
                setPreviousUrl(resp.data.previous);
                setPokemonList(resp.data.results);
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }

    const getPokemonImage = (pokemon) => {
        const id = (pokemon.url).split('/')[6];
        return Constant.pokemonImageUrl+`${id}.png`
    }

    const toPokemonDetail = (pokemon) => {
        history.push(Constant.pokemonDtailPath+pokemon.name)
    }

    const next = () => {
        if (nextUrl) PokemonService.defaultGetService(nextUrl)
            .then(resp => {
                if(resp && resp.data) {
                    setNextUrl(resp.data.next);
                    setPreviousUrl(resp.data.previous);
                    setPokemonList(resp.data.results);
                }
            }).catch((err)=>{
                alert(err)
            })
    }

    const previous = () => {
        if (previousUrl) PokemonService.defaultGetService(previousUrl)
        .then(resp => {
            if(resp && resp.data) {
                setNextUrl(resp.data.next);
                setPreviousUrl(resp.data.previous)
                setPokemonList(resp.data.results);
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className='M-15px'>
            <h1 className='text-center'>Pokemon</h1>
            <div className='row'>
                <div className='col-sm-1'>
                    <button id='button-previous' onClick={previous} disabled={previousUrl ? false : true} className="btn btn-dark">
                        <span className='glyphicon glyphicon-chevron-left'>Previous</span>
                    </button>
                </div>
                <div className='col-sm-10'>
                    <div className='row'>
                        {
                            pokemonList.map(poke => {
                                const image = getPokemonImage(poke);
                                return (
                                    <div className='col-sm-2 Mb-15px' key={poke.name}>
                                        <div className='card Cp' onClick={ () => toPokemonDetail(poke) } key={poke.name}>
                                            <img className='card-img-top' src={image} alt=''/>
                                            <div className="card-body">
                                                <p className="card-text text-center">{(poke.name).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='col-sm-1'>
                    <button id='button-next' onClick={next} disabled={nextUrl ? false : true} className="btn btn-dark">
                        <span className='glyphicon glyphicon-chevron-right'>Next</span>
                    </button>
                </div>
            </div>
        </div>
    )

}

export default PokemonListComponent;