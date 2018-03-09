import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
// import { counter } from './index.redux'
import reducers from './reducer'
import './config'
import './index.css'
import Login from './container/login/login';
import Register from './container/register/register'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
function Boss() {
    return <h2>boss page</h2>
}
ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),document.getElementById('root')
)
