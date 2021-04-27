const fs = require("fs");

const modificarUsuario =(nome, curso, categoria) => {
    fs.readFile("./usuario.json", {encoding: 'utf-8'}, (error, dados)=> {
        if (error) {
            console.log("failed to read !")
        } else {
            let conteudo = JSON.parse(dados)
            
            conteudo.nome = nome
            conteudo.curso = curso
            conteudo.categoria = categoria
            
            fs.writeFile("./usuario.json", JSON.stringify(conteudo), (erro)=> {
                if (erro) {
                    console.log("failed to write")
                }
            })
        }
    })
}


modificarUsuario("Marc", "php", "algoritmo")