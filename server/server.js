import {renderToString} from 'react-dom/server'
import React from 'react'
import {Provider} from 'react-redux'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import { StaticRouter} from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer';
assethook({
    extensions:['png']
})
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const app = express()
const model = require('./model')

const Chat = model.getModel('chat')
const path = require('path')
//work with express 
const server = require('http').Server(app)
const io = require('socket.io')(server)
// function App(){
//     return (
//         <div>
//             <p>server render</p>
//             <p>rocks</p>    
//         </div>
//     )
// }
// console.log(renderToString(<App></App>));

io.on('connection',function (socket) {
    console.log('user login')
    socket.on('sendmsg',function (data) {
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})


app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user',userRouter)
app.use(function(req,res,next){
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }
    const store = createStore(reducers,compose(
        applyMiddleware(thunk)
    ))
    let context={}
    const markup=renderToString((
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>
    ))
    const htmlRes =(<App></App>)
    res.send(htmlRes)
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function () {
    console.log('Node app start at port 9093')
})