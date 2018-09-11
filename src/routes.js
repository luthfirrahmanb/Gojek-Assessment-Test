import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import peopleComponent from './components/peopleComponent';
import filmsComponent from './components/filmsComponent';
import planetsComponent from './components/planetsComponent';
import speciesComponent from './components/speciesComponent';
import starshipsComponent from './components/starshipsComponent';
import vehiclesComponent from './components/vehiclesComponent';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={peopleComponent} />
                <Route path="/films" component={filmsComponent} />
                <Route path="/planets" component={planetsComponent} />
                <Route path="/species" component={speciesComponent} />
                <Route path="/starships" component={starshipsComponent} />
                <Route path="/vehicles" component={vehiclesComponent} />
            </div>
        )
    }
}

export default Routes;