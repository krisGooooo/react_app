
import React from 'react'
import {connect} from 'react-redux'

@connect(
    state=>state
)
class Msg extends React.Component{
    render(){
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        
        return (
            <div>
                <h2>消息列表</h2>
            </div>
        )
    }
}

export default Msg