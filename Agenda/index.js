const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const config = require("./config/config");

const AppointementService = require("./services/AppointementService")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}))

app. use(bodyParser.json()); 

app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(()=>{
    console.log("Connected successfully to mongodb");
  }).catch(error => {
    console.log("Error: "+error);
  });

app.get("/", (req, res)=> {
    res.render("index")
})

app.get("/cadastro", (req, res)=> {
    res.render("create")
})

app.post("/create", async (req, res) => {
  let status = await AppointementService.create(
    req.body.name,
    req.body.email,
    req.body.description,
    req.body.cpf,
    req.body.date,
    req.body.time
  )

  if(status) {
    res.redirect("/")
  } else {
    res.send("Ocorreu uma falha")
  }

})

app.get("/getcalendar", async (req, res) => {
  let appointments = await AppointementService.getAll(false)
  res.json(appointments)
})

app.get("/event/:id", async (req, res)=> {
  res.json({id: req.params.id})
})

app.listen(config.LISTEN_PORT, () => {
    console.log(`The API is running at http://localhost:${config.LISTEN_PORT}`);
});