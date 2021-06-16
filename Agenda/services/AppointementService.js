const appointment = require("../models/Appointment")
const mongoose = require('mongoose')

const AppointmentFactory = require ("../factories/AppointmentFactory")

let Appo = mongoose.model("Appointment", appointment)

class AppointmentService {
    
    async create(name, email, description, cpf, date, time, finished) {
        let newAppo = new Appo({
            name,
            email,
            cpf,
            description,
            cpf,
            date,
            time,
            finished: false
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
    
}

module.exports = new AppointmentService()