// npm nodemon

// usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db") //importa da pasta oq foi exportado de lá

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended:true }))


//configuração no nunjuncks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// criei uma rota /
// capturo o pedido do cliente pra responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeias = [...rows].reverse() //cópia do ideias, não um atalho
    
        let lastIdeias = []
        for (let ideia of reversedIdeias){ //reverte a ordem para decrescente
            if(lastIdeias.length < 2){
                lastIdeias.push(ideia)
            }
        }

        return res.render("index.html", { ideias: lastIdeias })
    })

})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeias = [...rows].reverse()
    
        return res.render("ideias.html", { ideias: reversedIdeias })
    })
})

server.post("/", function(req, res){
    //Inserir dado na tabela
    const query = `
        INSERT INTO ideias (
            image,
            title,
            category,
            description,
            link
        ) VALUES ( ?, ?, ?, ?, ? );
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })
})

server.get("/ideias-del/:id", function(req, res){
    const ideia = req.params.id
    
    db.run(`DELETE FROM ideias WHERE id = ?`, ideia, function(err){
        if (err) return console.log(err)

        console.log("DELETEI")

        return res.redirect("/ideias")
    })
})


//liguei meu servidor na porta 3000
server.listen(3000)
