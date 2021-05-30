const User = require("../models/User")
class UserController {
    async index(req, res) {
       const users = await User.findAll()
       res.json(users)
    }

    async findUser(req, res) {
        const id = req.params.id
        const user = await User.findById(id);
        if(user) {
            res.status(200);
            res.json(user);
        } else {
            res.status(404)
            res.json({})
        }
    }

    async create(req, res) {
        let {email, name, password} = req.body;

        if(!email) {
            res.status(400);
            res.json({err: "invalid email"})
            return;
        } 
        const emailExist = await User.findEmail(email)
        if(emailExist) {
            res.status(406);
            res.json({err: "o email já esta cadastrado"});
            return;
        }

        await User.new(email, password, name)
        res.status(200)

        res.json("Cadastrado com sucesso")
    }

    async edit(req,res) {
        let {id, name, role, email} =req.body
        const result = await User.update(id, email, name, role);
        if(result) {
            if(result.status) {
                res.status(200)
                res.send("editado com sucesso")
            } else {
                res.status(406);
                res.send(result.err)
            }
        } else {
            res.status(406);
            res.send("error no servidor")
        }
    }

    async remove(req, res) {
        const id = req.params.id;

        const result = await User.delete(id);

        if(result.status) {
            res.status(200);
            res.send("deletado com sucesso")
        } else{
            res.status(406);
            res.send(result.err);
        }
    }
}

module.exports = new UserController();