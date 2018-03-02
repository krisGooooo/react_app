import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

// import { counter } from './index.redux'
import reducers from './reducer'
import './config'
import Login from './container/login/login';
import Register from './container/register/register'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </div>
            </BrowserRouter>
        </Provider>
    ),document.getElementById('root')
)
