const express = require("express")
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session")
//
let flash = require("express-flash")

const cookieParser = require("cookie-parser")


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(flash());

app.use(cookieParser("krgjrgjerbgjebgjbegje"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnitialized: true,
    cookie: {maxAge: 60000}
}))

app.get("/", (req, res)=> {

    let emailError = req.flash("emailError")
    let pontosError = req.flash("pontosError")
    let nomeError = req.flash("nomeError")
    let email = req.flash("email")

     emailError = (emailError == undefined || emailError == 0) ? undefined : emailError
     email = (email == undefined || email.length == 0) ? "": email;
    res.render("index", {emailError, nomeError, pontosError, email: email})
})

app.post("/form", (req, res)=> {
    const {email, name, pontos} =req.body

let emailError ;
let pontosError;
let nomeError;
    if(email == undefined || email ==""){
        emailError = "O e-mail não pode ser vazio"
    }

    if(name == undefined || name ==""){
        nomeError = "O e-mail não pode ser vazio"
    }

    if(pontos == undefined || pontos <20){
        pontosError = "Não pode ter menos de 20 ponto"
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined) {
        req.flash("emailError", emailError)
        req.flash("pontosError", pontosError)
        req.flash("nomeError", nomeError)

        req.flash("email", email)
        res.redirect("/")
    } else {
        res.send("show")
    }

})



app.listen(5000, (req, res)=> {
    console.log("servidor rodando na porta 5000")
})