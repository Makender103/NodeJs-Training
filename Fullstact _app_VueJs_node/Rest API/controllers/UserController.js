const User = require("../models/User")
const PasswordToken = require("../models/PasswordToken")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const secret = "fgiegeighlegbksngjgurgksbgjsbdgbsjgbsbg"
class UserController {
    async index(req, res) {
        try {
            const users = await User.findAll()
            res.json(users)
            
        } catch (error) {
            console.log(error)
        }
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

        if(!email || email == ' ') {
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

    async recoverPassword(req, res) {
        let email = req.body.email;
        let result = await PasswordToken.create(email);
        if (result.status) {
            res.status(200);
            res.send(toString(result.token))
            // Node.send usando Node Mailer
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req, res) {
        let token = req.body.token;
        let password = req.body.password;

        let isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status) {
           await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
           res.status(200);
           res.send("senha alterada")
        }else {
            res.status(406);
            res.send("Token Invalido !");
        }

    }

    async login(req, res) {
        let {email, password} = req.body;

        let user = await User.findByEmail(email);

        if(user) {

            let resultado =await bcrypt.compare(password, user.password)

            if(resultado) {
                let token = jwt.sign({email: user.email, role:user.role}, secret)
                res.status(200);
                res.json({token:token})
            }else {
                res.status(406);
                res.json({err: "senha incorreta"})
            }
            
        }else {
            res.status(406);
            res.json({status: false, err: "o usuario não existe"});
        }
    }
}

module.exports = new UserController();