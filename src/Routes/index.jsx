import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Consumer from '../pages/Consumer'
import Producer from '../pages/Producer'

export default function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/producer' exact component={Producer} />
            <Route path='/consumer' exact component={Consumer} />
        </Switch>
    )
}