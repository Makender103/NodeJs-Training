const knex = require("../database/connection")
const bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

// service
class User {

    async findAll() {
        
        try {
            const result = await knex.select(["id", "name", "email", "role"]).table("users");
            return result;
        } catch(err) {
            console.log('estou')
            console.log(err)
            return [];
        }
        
    }

    async findById(id) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("users");
            if(result.length > 0){
                return result[0];
            } else{
                return undefined;
            }
        } catch(err) {
            console.log(err)
            return [];
        }
        
    }

    async findByEmail(email) {
        try {
            const result = await knex.select(["id", "name","password", "email", "role"]).where({email: email}).table("users");
            if(result.length > 0){
                return result[0];
            } else{
                return undefined;
            }
        } catch(err) {
            console.log(err)
            return [];
        }
        
    }


    async new(email, password, name){
        try {
            const hash = await bcrypt.hash(password, 10)
            await knex.insert({name,email, password: hash, role: 0}).table("users")
        } catch(err) {
            console.log(err)
        }

    }

    async findEmail(email) {
        try {
           const result =  await knex.select("*").from("users").where({email: email});
           if(result.length > 0) {
            return true
           } else {
               return false
           }
        } catch(err) {
            console.log(err)
        }
    }

    async update(id, email, name, role) {
        let user = await this.findById(id);

        if(user) {
            let editUser = {};

            if(email) {
                if(email != user.email) {
                   let result = await this.findEmail(email)
                   if(result == false) {
                       editUser.email = email
                   } else {
                    return {status: false, err: "O email já está cadastrado"}
                    }
                }
            }

            if(name) {
                editUser.name = name
            }

            if(role) {
                editUser.role = role
            }

            try {
                await knex.update(editUser).where({id: id}).table("users")
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }

        } else {
            return {status: false, err: "O usuario não existe !"}
        }
    }

    async delete(id) {
        let user = await this.findById(id)
        if(user) {
            try {
                await knex.delete().where({id: id}).table("users")
                return {status: true}
            }catch(err) {
            return {status: false, err: err}

            }
        } else {
            return {status: false, err: "usuario não existe !"}
        }
    }

    async changePassword(newPassword, id, token) {
        let hash = await bcrypt.hash(newPassword, 10)
        await knex.update({password: hash}).where({id: id}).table("users");
        await PasswordToken.setUsed(token)
    }
}

module.exports = new User();