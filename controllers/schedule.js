const DAY_SCHEDULE = require('../models/day_schedule.js');
const APPOINTMENT = require('../models/appointment.js');
const MOMENT = require('moment');
const VET = require("../models/veterinary");


exports.DaySchedule = (req, res) => {
    DAY_SCHEDULE.findOne({ date: req.body.date}, (err, MyDaySchedule) => {
        if(err)
            res.status(406).json(err);
       if (MyDaySchedule){
           return res.status(411).send({ error: "vous avais deja saisie cette date" });
       }
        if(!MyDaySchedule){
            let temp_date = new Date();
            temp_date = MOMENT(temp_date).format('YYYY-MM-DD');
            today = new Date(temp_date);
            const REQUEST_DAY = new Date(req.body.date);
            if(REQUEST_DAY < today){
                return res.status(411).send({ error: "la date saisie ne peut pas etre pour aujourd'huit" });

            }else{
                const NewDaySchedule = new DAY_SCHEDULE({
                    date: req.body.date,
                    veterinaryId: req.body.veterinaryId,
                    appointments: []
                }).save((err, NewDaySchedule) => {
                    if(err)
                        res.status(406).json(err);

                    /* Success */
                    res.status(201).json(NewDaySchedule);
                })
            }
        }else{
            /* Success */
            res.status(200).json(MyDaySchedule);
        }
    });
};
exports.AddAppointment = async (req, res) => {
    if (!req.body.serviceid || !req.body.clientId || !req.body.petId)
        return res.status(406).json({error: 'No Service or Client send'});
    const MY_APPOINTMENT = new APPOINTMENT({
        serviceid: req.body.serviceid,
        clientId: req.body.clientId,
        veterinaryId: req.body.veterinaryId,
        petId: req.body.petId,
        hour: req.body.hour,
        notes: req.body.notes ? req.body.notes : null
    });
    let appointments = [];
    appointments.push(MY_APPOINTMENT);
        DAY_SCHEDULE.findByIdAndUpdate(req.body.id,{ appointments: appointments }, err => {
                if(err)
                    res.status(406).json(err);
                res.status(201).json(appointments);
            });

};
exports.UpdateAppointment = (req, res, next) => {
    DAY_SCHEDULE.findByIdAndUpdate(req.body.id,
        { appointments: req.body.appointments },
        (err, appointments) => {
            if(err)
                res.status(406).json(err);
            res.status(201).json(appointments);
        });
};

// get les date pour un veto       const user = await CLIENT.findOne({email: body.email});
exports.DayworkVet = (req, res, next) => {
      DAY_SCHEDULE.find({ veterinaryId: req.body.veterinaryId })
          .populate('DaySchedule')
          .exec((err, MyDaySchedule) => {
          if(err)
              res.status(406).json(err);
          if (MyDaySchedule[2]){
              //console.log(MyDaySchedule[2].veterinaryId)
              res.status(200).json(MyDaySchedule);
          }else {
              //console.log(req.body.veterinaryId)
              return res.status(411).send({ error: "pas de date programmé " });
          }

          }

      );
    ;
};



//get les rendevous pour un veto

exports.Appointveto = (req, res, next) => {
    DAY_SCHEDULE.find({ veterinaryId: req.body.veterinaryId })
        .populate('DaySchedule')
        .exec((err, MyDaySchedule) => {
                if(err)
                    res.status(406).json(err);
                if (MyDaySchedule[2]){
                    //console.log(MyDaySchedule[2].veterinaryId)
                    res.status(200).json(MyDaySchedule);
                }else {
                    //console.log(req.body.veterinaryId)
                    return res.status(411).send({ error: "pas de date programmé " });
                }

            }

        );
    ;
};




// get les rdv pour un client

// get les rdv pour un services




