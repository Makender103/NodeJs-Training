const Reader = require("./Reader");
const Processor = require("./Processor")
const HtmlParser = require("./HtmlParser")
const Table = require("./Table")
const Writer = require("./Writer")
const PdfWriter = require("./PdfWriter")

let leitor = new Reader();
let escritor = new Writer();

const main = async() =>{
    let dados = await leitor.Read("./user.csv")
    let dadosProcessados = Processor.Process(dados)

    var usuarios = new Table(dadosProcessados)
    let html =  await HtmlParser.Parse(usuarios)
    
    escritor.Write(Date.now() + ".html", html)
    PdfWriter.WritePDF(Date.now() + ".PDF", html)
}
main();