const express = require("express")
//criei a variável express para receber a função require()
//require() é uma função para chamar algum módulo/componente
//a const express se tornará a função recebida require("express")
const server = express()
const routes = require("./routes")

//usando o template engine
server.set('view engine', 'ejs')

//para habilitar arquivos estáticos do diretório public e executar as rotas
server.use(express.static("public"))
// a função use() serve para adicionar configurações ao servidor
// ou seja, tudo que existe dentro do diretório public, vai virar uma rota (images, scripts e styles viram uma rota)

//request, response
//server.get('/', (request, response) => {
//quando acessa a página, faz-se um get (que faz a comunicação com o servidor). Quando ocorre o get  (ou seja, quando o usuário acessa a aplicação), então terá como segundo parâmetro a arrow function
//    return response.sendFile(__dirname + "/views/index.html")
    //__dirname significa que a aplicação vai até a pasta src
//})


//routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))
//o servidor vai escutar a porta 3000 (parametrizável), e vai rodar a função anônima(arrow function) criada que está rodando o console.log