import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PokemonService from "./PokemonService";
import pokeball from '../assets/pokeball.png';
import { Constant } from "../Constant";

const PokemonDetailComponent = () => {

    const param = useParams();
    const pokemon = {
        name : null,
        moves : [],
        types : [],
        sprites: [],
        height: null,
        weight: null,
        nickName: ''
    }
    const [pokemonDetail, setPokemonDetail] = useState(pokemon);
    const [catched, setCatched] = useState(false);
    const [fiboLast, setFiboLast] = useState(-1);
    const [fiboCurrent, setFiboCurrent] = useState(0);
    const [nickName, setNickName] =useState('');
    const [show, showNickName] =useState(false);

    useEffect(() =>{
        if(pokemonDetail.name == null) getPokemonDetail(param);
    })

    const getPokemonDetail = (param) => {
        PokemonService.getPokemonDetail(param.name)
            .then(resp => {
                const data = resp.data;
                const poke = {
                    name: data.name,
                    moves: setMoves(data.moves),
                    types: setTypes(data.types),
                    sprites: [data.sprites.front_default],
                    height: data.height,
                    weight: data.weight,
                    nickName: ''
                }
                setPokemonDetail(poke)
                let myPokemon = localStorage.getItem(Constant.pokemonLocalStorage);
                let currentPokemon = myPokemon === null ? [] : JSON.parse(myPokemon);
                if(currentPokemon.findIndex(x => x.name === data.name) !== -1) setCatched(true);
            }).catch((err)=>{
                alert(err)
            })
    }

    const setMoves = (moves) => {
        var movs = moves.map(move => {
            return move.move.name;
        });
        return movs;
    }

    const setTypes = (types) => {
        var typs = types.map(type => {
            return type.type.name;
        })
        return typs;
    }

    const catchPokemon = () => {
        let currentPokemon = localStorage.getItem(Constant.pokemonLocalStorage);
        let newData = currentPokemon === null ? [] : JSON.parse(currentPokemon);
        let newMyPokemon = newData.concat(pokemonDetail);
        localStorage.setItem(Constant.pokemonLocalStorage, JSON.stringify(newMyPokemon));
        setCatched(true);
    }

    const validationCatch = () => {
        PokemonService.defaultGetService(Constant.probabilityUrl)
        .then(resp => {
            if(resp && resp.data && resp.data.value) {
                showNickName(true);
            } else {
                alert('Failed to catch, Try again');
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const releasePokemon = (name) => {
        let myPokemon = localStorage.getItem(Constant.pokemonLocalStorage);
        let currentPokemon = myPokemon === null ? [] : JSON.parse(myPokemon);
        let idx = currentPokemon.findIndex(x => x.name === name);
        currentPokemon.splice(idx,1);
        localStorage.setItem(Constant.pokemonLocalStorage, JSON.stringify(currentPokemon));
        setCatched(false);
    }

    const validationRelease = (name) => {
        PokemonService.defaultGetService(Constant.primeNumUrl)
        .then(resp => {
            if(resp && resp.data && resp.data.value) {
                releasePokemon(name);
            } else {
                alert('Failed to release, Try Again');
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const changeName = () => {
        let params = `?current=${fiboCurrent}&last=${fiboLast}`
        PokemonService.defaultGetService(Constant.fibonacciUrl+params, true)
        .then(resp => {
            if(resp) {
                setFiboLast(fiboCurrent);
                setFiboCurrent(resp.data);
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    const changeNickName = (event) => {
        const val = document.getElementById('nickname').value;
        setNickName(val);
    }

    const saveNickName = () => {
        setTimeout(()=>{
            const val = document.getElementById('nickname').value;
            setPokemonDetail({...pokemonDetail, ['nickName']: val});
            console.log(pokemonDetail);
            catchPokemon();
            showNickName(false);
            setNickName('');
        }, 100)
    }

    return(
        <div className='M-15px'>
            <h1 className="display-4 text-center">{pokemonDetail.name}{fiboCurrent >= 0 && fiboLast >= 0 ? '-'+fiboCurrent : ''}</h1>
            <div className='row'>
                <div className='col-sm-8'>
                    {
                        !show ?
                        <div>
                            {
                                catched ? 
                                <button type="button" className='btn btn-danger M-15px' onClick={() => validationRelease(pokemonDetail.name)}> 
                                    <img src={pokeball} alt='' width='20' height='20'/> RELEASE POKEMON {pokemonDetail.name ? (pokemonDetail.name).toUpperCase() : ''}
                                </button>:
                                <button type="button" className='btn btn-danger M-15px' onClick={validationCatch}> 
                                    <img src={pokeball} alt='' width='20' height='20'/> CATCH POKEMON {pokemonDetail.name ? (pokemonDetail.name).toUpperCase() : ''}
                                </button> 
                            }
                            <button type="button" className='btn btn-success M-15px' onClick={changeName}>rename</button> 
                        </div> : <div></div>
                    }
                    {
                        show ? <div className='row'>
                            <div className='form-group col-md-3 M-15px'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='nickname'
                                    name='nickname'
                                    placeholder='Input Nickname'
                                    value={nickName}
                                    onChange={changeNickName}
                                />
                            </div>
                            <div className='form-group col-md-5'>
                                <button className='btn btn-primary' onClick={saveNickName}>Set Nick Name</button>
                            </div>
                        </div> : <div></div>
                    }
                    <div className='M-15px'>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td className='form-label col-sm-3'>Pokemon Name</td>
                                    <td className='form-label W-5px'>:</td>
                                    <td className='form-label'>{pokemonDetail.name}{fiboCurrent >= 0 && fiboLast >= 0 ? '-'+fiboCurrent : ''}</td>
                                </tr>
                                {
                                    pokemonDetail.nickName ?
                                    <tr>
                                        <td className='form-label col-sm-3'>Pokemon Nickname</td>
                                        <td className='form-label W-5px'>:</td>
                                        <td className='form-label'>{pokemonDetail.nickName}</td>
                                    </tr> : <></>
                                }
                                <tr>
                                    <td className='form-label col-sm-3'>Height</td>
                                    <td className='form-label W-5px'>:</td>
                                    <td className='form-label'>{pokemonDetail.height}</td>
                                </tr>
                                <tr>
                                    <td className='form-label col-sm-3'>Weight</td>
                                    <td className='form-label W-5px'>:</td>
                                    <td className='form-label'>{pokemonDetail.weight}</td>
                                </tr>
                                <tr>
                                    <td className='form-label col-sm-3'>Types</td>
                                    <td className='form-label W-5px'>:</td>
                                    <td className='form-label'>
                                    {
                                        pokemonDetail.types.map((type, idx) => {
                                            return(
                                                <div className='col-sm-8' key={type}>
                                                    <label className='form-label'>[{idx+1}] {type} </label>
                                                </div>
                                            )
                                        })
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td className='form-label col-sm-3'>Moves</td>
                                    <td className='form-label W-5px'>:</td>
                                    <td className='form-label'>
                                        <div className='row'>
                                            {
                                                pokemonDetail.moves.map((move, idx) => {
                                                    return(
                                                        <div className='col-sm-6' key={move}>
                                                            <label className='form-label'>[{idx+1}] {move} </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-sm-4'>
                    {
                        pokemonDetail.sprites.map(img => {
                            return (
                                <div className='card M-15px' key={img}>
                                    <img className='card-img-top' src={img} alt=''/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default PokemonDetailComponent;