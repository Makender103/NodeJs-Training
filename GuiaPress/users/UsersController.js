const express = require("express")
const router = express.Router();

const bcrypt =  require('bcryptjs');
const User = require("./User");

router.get("/admin/users", (req, res) => {

    User.findAll().then(users => {
        res.render("admin/users/index", {
            users: users
        })  
    })
    // res.send("Listagem de usuarios")
});

router.get("/admin/users/create", (req, res)=> {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res)=> {
    let email = req.body.email;
    let password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    User.findOne({where: {
        email: email 
    }}).then( user => {
        if(user == undefined) {
            User.create({
                email: email,
                password: hash
            }).then(()=> {
                res.redirect("/")
            }).catch((error)=>{
                res.redirect("/")
            })
        } else {
            res.redirect("/admin/users/create");
        }
    })


    // res.json({email, password})
})

router.get("/login", (req, res)=> {
    res.render("admin/users/login")
})

router.post("/authenticate", (req, res)=> {
    const email = req.body.email
    const password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user=> {
        if (user != undefined) {
            //password Validation
            const correct = bcrypt.compareSync(password, user.password);

            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("admin/articles")
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    })

})

module.exports = router;