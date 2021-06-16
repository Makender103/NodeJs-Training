const appointment = require("../models/Appointment")
const mongoose = require('mongoose')
const AppointmentFactory = require ("../factories/AppointmentFactory")
const nodemailer = require("nodemailer");


let Appo = mongoose.model("Appointment", appointment)

class AppointmentService {
    
    async create(name, email, description, cpf, date, time) {
        let newAppo = new Appo({
            name,
            email,
            cpf,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        });
        
        try {
            await newAppo.save();
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    
    async getAll(showFinished) {
        
        if(showFinished) {
            return await Appo.find()
        } else {
            let appos = await  Appo.find({'finished': false})
            let appointments = [];

            appos.forEach(appointment =>{
                    appointments.push(AppointmentFactory.Build(appointment))

            });

            return appointments;
        }

    }

    async getById(id) {
        try {
            let event = await Appo.findOne({'_id': id})
            return event
            
        } catch (error) {
            console.log(erro)
            
        }
    }


    async finish(id) {
        try {
            Appo.findByIdAndUpdate(id, {finished: true})
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    async search(query) {
        try {
            let appos = await Appo.find().or([{email: query}, {cpf: query}])
            return appos;
            
        } catch (error) {
            console.log(err);
            return[]
            
        }
    }


    async sendNotification() {
        let appos = await this.getAll(false)
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "df3949c36a9634",
              pass: "f24708878bfb1c"
            }
          });
        appos.forEach(async app => {
            let date = app.start.getTime();
            let hour = 1000 * 60 * 60 // *n hours

            let gap = date -Date.now();

            if (gap <= hour) {
                if(!app.notified) {
                    console.log('entrei')
                   await Appo.findByIdAndUpdate(app.id, {notified: true});
                   transport.sendMail({
                       from: "Marc kender <mkender13@gmail.com>",
                       to: app.email,
                       subject: "sua consulta acontecerá em breve",
                       text: "show de bola"
                   }).then(()=> {

                   }).catch(err=>{
                       console.log(err)
                   })
                }
            }
        })
        
    }
    
}

module.exports = new AppointmentService()