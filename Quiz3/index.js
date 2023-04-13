const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)

  let result = login(req.body.username, req.body.password)
  let token = generateToken(result)
  res.send(token)
})

app.get('/', verifyToken, (req, res) => {
  res.send('Hello UTeM!')
})

app.get('/bye', verifyToken, (req, res) => {
  res.send('Bye Bye UTeM!')
})

app.post('/register', (req, res) => {
  let result = register (
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.email
  )

  let token = generateTokrn(result)
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
{
    username: "nur",
    password: "123456",
    name: "Nur",
    email: "nurfarahizzati3@gmail.com"
},
{
    username: "farah",
    password: "654321",
    name: "Farah",
    email: "fafafarah0607@gmail.com"
},
{
    username: "izzati",
    password: "7890",
    name: "Izzati",
    email: "farah06@gmail.com"
}
]

function login(username, password) {
  let matchUser = dbUsers.find(
    user => user.username == username      //=> what to do with user
  )
  if (!matchUser) return "User not found!"
  if (matchUser.password == password) {
    return matchUser
  } else{
    return "Invalid password"
  }
  }

function register(a, b, c, d) {
  dbUsers.push({
    username: a,
    password: b,
    name: c,
    email: d
  })
}

const jwt = require('jsonwebtoken');
function generateToken (userData) {
  const token = jwt.sign(
    userData,
    'inipassword',
    { expiresIn: 60}
  );
  return token
}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded){
    if(err){
      res.send("Invalid Token")
    }

    req.user = decoded
    next()
  });
}