const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path") // modulo para mostrar o caminho de algum arquivo 

// usando template engine
server.set('view engine', 'ejs')

//mudar a localização da pasta views
//a função .set configura algo
// .join junta __dirname com views
// __dirname é como ser fosse a pasta src
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body 
// habilitar o post do job

server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))
