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
import staticPath from '../build/asset-manifest.json'
assethook({
    extensions:['png','ico']
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
    const obj={
        '/msg':'React聊天消息列表',
        '/boss':'boss查看牛人列表页面'
    }
    const pageHtml = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
        <link rel="stylesheet" href="/${staticPath['main.css']}">
        <meta name="keywords" content="React,聊天，app,SSR,Redux">
        <meta name="description" content='${obj[req.url]}'>
        <meta name="author" content="krisGooooo">
        
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${markup}</div>
        <script src="/${staticPath['main.js']}"></script>
      </body>
    </html>
    `
    res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function () {
    console.log('Node app start at port 9093')
})