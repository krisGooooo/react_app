import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,Radio,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
        console.log(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.state.type==='genius'}
                        onChange={()=>this.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem
                        checked={this.state.type==='boss'}
                        onChange={()=>this.handleChange('type','boss')}    
                    >
                        boss
                    </RadioItem>
                    <WhiteSpace />          
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>          
                </List>
            </div>
        )
    }
}

export default Register