const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const httpProxy = require('express-http-proxy')
const TokenController = require('./controller/token-verifier')
const UserController = require("./controller/user.controller");

const serviceMenuProxy = httpProxy(process.env.SERVICE_MENU_URI || 'http://localhost:3000');
const serviceOrderProxy = httpProxy(process.env.SERVICE_ORDER_URI || 'http://localhost:3000');
const serviceUserProxy = httpProxy(process.env.SERVICE_USER_URI || 'http://localhost:3000');

app.use(bodyParser.json())
app.use(cookieParser());

var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.post('/login/:type', function (req, res)
{
    UserController.loginUser(req.body, req.params.type).then( (data) => {
        res.cookie("token", data.token, {
            path: "/"
        }).json(data.userData)
    })
})

app.post('/create/:type', function (req, res)
{
    UserController.createUser(req.body, req.params.type, null).then( (user) => {
        res.status(201).json(user)
    })
})

app.post('/create/:type/:sponsor', function (req, res)
{
    UserController.createUser(req.body, req.params.type, req.params.sponsor).then( (user) => {
        res.status(201).json(user)
    })
})

app.post('/verify', function (req, res)
{
    const verifiedData = TokenController.verifyTokenLogin(req.cookies)
    if(verifiedData.response)
    {
        res.json(verifiedData.userData)
    }
    else {
        res.status(401).send("Invalid Token")
    }
})

app.use('/', (req, res, next) => {

    let tokenData = TokenController.verifyTokenLogin(req.cookies)
    if(tokenData.response){
        req.body.roleToken = tokenData.userData.role
        if (req.path.includes('user')){
            serviceUserProxy(req, res, next);
        }

        if (req.path.includes('order')) {
            serviceOrderProxy(req, res, next);
        }

        if (req.path.includes('menu') || req.path.includes('article')) {
            serviceMenuProxy(req, res, next);
        }
    }
    else{
        res.status(403).send('Invalid Token')
    }

});

app.listen(3000)