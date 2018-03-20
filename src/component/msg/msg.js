
import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        const Item = List.Item
        const Brief = List.Brief
        const userid = this.props.user_id
        const userinfo = this.props.chat.users

        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup)

        return (
            <div>

                    {chatList.map(v=>{
                    const lastItem = this.getLast(v)
                    const targetId = v[0].from==userid?v[0].to:v[0].from
                    console.log(userinfo,targetId)
                    if(!userinfo[targetId]){
                        return null
                    }
                    // const name = userinfo[targetId] ? userinfo[targetId].name:''
                    // const avatar = userinfo[targetId] ? userinfo[targetId].avatar:''
                    return(
                        <List key={lastItem._id}>
                        <Item
                            thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                        >
                        {lastItem.content}
                        <Brief>{userinfo[targetId].name}</Brief>
                        </Item>
                        </List>
                    )
                        
                    })}

            </div>
        )
    }
}

export default Msg