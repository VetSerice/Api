const MOMENT = require('moment');
const DAY_SCHEDULE = require('../models/day_schedule.js');
const APPOINTMENT = require('../models/appointment.js');

exports.DaySchedule = (req, res) => {
    DAY_SCHEDULE.findOne({ date: new Date(req.body.date) }, (err, MyDaySchedule) => {
        if(err)
            res.status(406).json(err);

        if(!MyDaySchedule){
            let temp_date = new Date();
            temp_date = MOMENT(temp_date).format('YYYY-MM-DD');
            today = new Date(temp_date);
            const REQUEST_DAY = new Date(req.body.date);
            if(REQUEST_DAY < today){
               console.log(res.status(410).json())
            }else{
                const NewDaySchedule = new DAY_SCHEDULE({
                    date: req.body.date,
                    appointments: []
                }).save((err, NewDaySchedule) => {
                    if(err)
                        console.log(err)
                        // res.status(406).json(err);

                    /* Success */
                    else {
                        res.status(201).json(NewDaySchedule);
                    }
                })
            }
        }else{
            /* Success */
            res.status(200).json(MyDaySchedule);
        }
    });
};
exports.AddAppointment = (req, res) => {
    if(!req.body.service || !req.body.clientId || !req.body.petId)
        return res.status(406).json({ error: 'No Service or Client send' });

    const MY_APPOINTMENT = new APPOINTMENT({
        service: req.body.service,
        clientId: req.body.clientId,
        petId: req.body.petId,
        hour: req.body.hour,
        notes: req.body.notes ? req.body.notes : null
    });

    let appointments = req.body.appointments;
    appointments.push(MY_APPOINTMENT);

    DAY_SCHEDULE.findByIdAndUpdate(req.body.id,
        { appointments: appointments },
        err => {
            if(err)
                res.status(406).json(err);

            /* Success */
            res.status(201).json(appointments);
        });
};
exports.UpdateAppointment = (req, res, next) => {
    DAY_SCHEDULE.findByIdAndUpdate(req.body.id,
        { appointments: req.body.appointments },
        (err, appointments) => {
            if(err)
                res.status(406).json(err);

            /* Success */
            res.status(201).json(appointments);
        });
};
