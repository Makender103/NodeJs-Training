class AppointmentFactory {
    Build(simpleAppointment) {
        let day = simpleAppointment.date.getDate() + 1;
        let month = simpleAppointment.date.getMonth();
        let year = simpleAppointment.date.getFullYear();

        let hour = Number.parseInt(simpleAppointment.time.split(":")[0]);
        let minutes = Number.parseInt(simpleAppointment.time.split(":")[1])

        
        let startDate = new Date(year, month, day, hour, minutes,0,0)
        
        let appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + "_" + simpleAppointment.description,
            start: startDate,
            end: startDate,
            email: simpleAppointment.email,
            notified: simpleAppointment.notified
        }

        return appo;
    }
}

module.exports = new AppointmentFactory()