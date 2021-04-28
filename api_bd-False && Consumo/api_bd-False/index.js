const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")

const jwt = require("jsonwebtoken")
const JWTSecret = "lfhglkgkegkerkggkregkrgkrengkegkng"
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

function auth(req, res, next) {
    const autToken = req.headers['authorization'];
    
    if(autToken != undefined) {
        const bearer = autToken.split(' ');
        
        let token = bearer[1]
        jwt.verify(token,JWTSecret, (err, data)=> {
            if(err){
                res.status(401);
                res.json({err: "token invalida"})
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.id}
                next()
            }
        });
    }else {
        res.status(401);
        res.json({err: "without Token"})
    }
}


let DB = {
    games: [
        {
            id: 23,
            title: "Call of duty",
            year: 2017,
            price: 60
        },
        {
            id: 24,
            title: "Call of duty",
            year: 2019,
            price: 600
        },   {
            id: 25,
            title: "Sea of thieves",
            year: 2018,
            price: 60
        },   {
            id: 26,
            title: "minecraft",
            year: 2012,
            price: 604
        },
    ],
    users: [
        {
            id: 1,
            name: "Marc kender",
            email: "makender103@gmail.com",
            password: "node12345"
        },
        {
            id: 2,
            name: "laouni",
            email: "mjcode@gmail.com",
            password: "java123"
        }
    ]
}

app.get("/games", auth, (req, res)=> {
    req.loggedUser
    res.statusCode = 200
    res.json({user: req.loggedUser, games: DB.games})
})

app.get("/games/:id", (req, res)=> {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    }else {
        const id = parseInt(req.params.id)
       const game = DB.games.find(g =>g.id == id)

        if (game != undefined) {
            res.json(game)
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }
})


app.post("/game", (req, res)=> {
    let {title, price, year} = req.body;

    DB.games.push({
        id: 234,
        title,
        price,
        year
    })
    res.sendStatus(200)
})

app.delete("/game/:id", (req, res)=> {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    }else {
        const id = parseInt(req.params.id)
        const index = DB.games.findIndex(g =>g.id == id)

        if(index == -1) {
            res.sendStatus(404)
        } else{
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})

app.put("/games/:id", (req, res)=> {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    }else {
        let id = parseInt(req.params.id)

       let game = DB.games.find(g =>g.id == id)

        if (game != undefined) {
        
            let {title, price, year} = req.body;

            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }
            res.sendStatus(200)


        } else {
            res.sendStatus(400)
        }
    }
});

app.post("/auth", (req, res)=> {
    let { email, password }= req.body;

    if (email != undefined) {

        let user = DB.users.find(u =>u.email == email);
        if (user != undefined) {

            if (user.password == password) {

                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (err, token) =>{
                    if (err) {
                        res.status(400);
                        res.json({err: "Falha interna"})
                    } else{
                        res.status(200);
                        res.json({token: token})
                    }
                })
            } else {
                res.status(401);
                res.json({err: "credencias invalidas"})
            }

        }else {
            res.status(404)
            res.json({err: "email não existe na base de dados"})
        }

    } else{
        res.status(400);
        res.send({err: " o email enviado é Invalido"})
    }
})



app.listen(45678, () => {
    console.log("api rodando na porta 45678 ...")
})



