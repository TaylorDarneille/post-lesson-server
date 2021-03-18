const express = require('express')
const app = express()
const cors = require('cors')

// indicates that we will accept requests to this server from any origin
// app.use(cors())
// converts the JSON from the request to a JS object
// and attaches it to body property of the request object
// i.e. express.json() middleware makes req.body work
// docs: http://expressjs.com/en/api.html#express.json
app.use(express.json())

app.post('/auth/login', (req, res, next)=>{
    console.log(req.body)
    res.json()
})

// expected data: JSON object containing name,status,role,race
app.post('/example', (req, res, next)=>{
    // respond w/ status 200 and JSON object response body:
    // {message: 'You sent me a [race] named [name]!'}
})

const users = []

app.post('/api/users', (req, res, next)=>{
    // something wrong with the string
    if(!req.body.username || typeof req.body.username != "string" || req.body.username.length<3)
    {return res.status(401).json({message: 'username must be a string containing at least 3 characters'})}
    
    // something wrong with the password
    else if (!req.body.password || typeof req.body.username != "string" || req.body.password.length<8)
    {return res.status(401).json({message: 'username must contain at least 3 characters'})}
    
    // check if subNewsletter is legit (if not, set it to false)
    if(!req.body.subNewsletter || typeof req.body.subNewsletter != "boolean") {
        req.body.subNewsletter = false
    }
    // create new user
    const newUser = {
        id: Math.floor(Math.random() * 10000000), // random whole numb between 0 and 10,000,000 
        username: req.body.username,
        password: req.body.password,
        subNewsletter: req.body.subNewsletter
    }
    users.push(newUser) // store in our records
    res.status(201).json(newUser)
})

app.listen(8000, ()=>{
    console.log('You\'re listening to the smooth sounds of port 8000')
})