const fs = require ("fs");
// const { writeFile } = require("node:fs");
/**leitura

var conteudo ;
fs.readFile("./marc.romel",{encoding: 'utf-8'}, (erro, dados)=> {
    if (erro) {
        console.log("failed to read the file")
    } else {
        conteudo = dados;
        console.log(dados)
    }
}) 

**/

fs.writeFile("./marc.romel", "Node Js Student , JS Student", (erro)=>{
    erro ? console.log("failed") : console.log("Done !")
})