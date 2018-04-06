import React from 'react'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
// import { counter } from './index.redux'
import Chat from './component/chat/chat'
import Login from './container/login/login';
import Register from './container/register/register'
import {Route,Switch} from 'react-router-dom'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }
    componentDidCatch(err,info){
        console.log(err,info)
        this.setState({
            hasError:true
        }) 
    }
    render(){
        return this.state.hasError
        ?<h2>页面出错了！请联系krisGooooo：851837721@qq.com </h2>
        :(
        <div>   
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/chat/:user' component={Chat}></Route>
                <Route component={Dashboard}></Route>
            </Switch>
        </div>
        )
    }
}

export default App