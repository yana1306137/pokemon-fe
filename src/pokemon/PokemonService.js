import axios from "axios";
import Service from "../service/Service"

const poekemonPath = 'pokemon/';

const getPokemonList = (offset, limit) => {
    return Service.get(poekemonPath+`?offset=${offset}&limit=${limit}`);
}

const getPokemonDetail = (name) => {
    return Service.get(poekemonPath+name)
}

const defaultGetService = (url, cors = false) => {
    // if (cors) return axios.get(url, {mode:'cors'});
    // else return axios.get(url);
    return axios.get(url);
}

const PokemonService = {
    getPokemonList,
    getPokemonDetail,
    defaultGetService
}

export default PokemonService;