import { Route, Switch } from "react-router"
import MyPokemonListComponent from "../pokemon/MyPokemonListComponent"
import PokemonDetailComponent from "../pokemon/PokemonDetailComponent"
import PokemonListComponent from "../pokemon/PokemonListComponent"

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={PokemonListComponent} />
            <Route exact path="/pokemon-list" component={PokemonListComponent} />
            <Route exact path="/my-pokemon-list" component={MyPokemonListComponent} />
            <Route exact path="/pokemon-detail/:name" component={PokemonDetailComponent} />
        </Switch>
    )
}

export default Routes