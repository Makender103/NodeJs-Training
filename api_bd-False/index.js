const express = require("express")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


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
    ]
}

app.get("/games", (req, res)=> {
    res.statusCode = 200
    res.json(DB.games)
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
})



app.listen(45678, () => {
    console.log("api rodando na porta 45678 ...")
})



