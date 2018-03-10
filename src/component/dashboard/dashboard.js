import React from 'react'
import {connect} from 'react-redux'
import { user } from '../../redux/user.redux';

function Boss() {
    return <h2>boss首页</h2>
}
function Genius() {
    return <h2>牛人首页</h2>
}

function Msg() {
    return <h2>消息列表</h2>
}
@connect(
    state=>state
)
class Dashboard extends React.Component{

    render(){
        const user = this.props.user
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'boss列表',
                component:Genius,
                hide:user.type=='genius'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },{
                path:'/me',
                text:
            }
       ]
        return (
            <div>
                <h2>Dashboard</h2>
    
                <h2>footer</h2>

            </div>
        )
    }
}

export default Dashboard