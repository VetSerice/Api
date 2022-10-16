const DAY_SCHEDULE = require('../models/day_schedule.js');
const APPOINTMENT = require('../models/appointment.js');
const MOMENT = require('moment');
const VET = require("../models/veterinary");
const {GetServiceID} = require("./service");
const {GetVetID} = require("./veterinary");
const {GetPetID} = require("./pet");


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
exports.UpdateAppointment = (req, res, next) => {
    DAY_SCHEDULE.findByIdAndUpdate(req.body.id, { appointments: req.body.appointments },
        (err, appointments) => {
            if(err)
                res.status(406).json(err);
            res.status(201).json(appointments);
        });
};
// get les date pour un veto       const user = await CLIENT.findOne({email: body.email});
exports.DayworkVet = (req, res, next) => {
    DAY_SCHEDULE.findOne({ veterinaryId: req.query.veterinaryId}, (err, MyDaySchedule) => {
          if(err)
              return res.status(406).json(err);
        if (!MyDaySchedule) {
            return res.status(411).send({ error: "id invalide " });
        }
          if (MyDaySchedule.veterinaryId){
              res.status(200).json(MyDaySchedule.date);
          }else {
              console.log(MyDaySchedule.date)
              return res.status(411).send({ error: "pas de date programmé " });
          }

          }

      );
    ;
};

//get les rendevous pour un veto
exports.Appointveto = async (req, res, next) => {
    let lS = await APPOINTMENT.find({clientId:req.query.id})
    if (!lS){
        return res.status(411).send({ error: "aucune donné trouver " });
    }else{
        for (const app of lS) {
            let veto =await GetVetID(app.veterinaryId)
            let pet =await GetPetID(app.petId)
            let service = await GetServiceID(app.serviceid)
            res.status(200).json(service);
        }
    }

}

// get les rdv pour un client
exports.GetClientAppoitment = async (req, res, next) => {
    let lS = await APPOINTMENT.find({clientId:req.query.id})
    //console.log(clientId);
    if (!lS|| !lS.length){
        return res.status(411).send({ error: "aucune donné trouver " });
    }else {
        for (const app of lS) {
        let veto =await GetVetID(app.veterinaryId)
        let pet =await GetPetID(app.petId)
        let service =await GetServiceID(app.serviceid)
        var data = {veto, pet, service,};
        console.log(data)
        return res.status(200).json(data);
    }}

}
exports.AddAppointments = async (req, res) => {
    if(!req.body.veterinaryId || !req.body.petId || !req.body.serviceid)
        return res.status(406).json({ error: 'No Service or Client send' });
    const MY_APPOINTMENT = new APPOINTMENT({
        clientId: req.body.clientId,
        serviceid:req.body.serviceid,
        veterinaryId: req.body.veterinaryId,
        testt: req.body.testt,
        petId: req.body.petId,
        hour: req.body.hour,
        notes: req.body.notes ? req.body.notes : null
    });
    console.log(req.body)
    let appointe= await MY_APPOINTMENT.save()
    DAY_SCHEDULE.findByIdAndUpdate(req.body.id, { $push:{appointments:appointe.id} }, (err ,doc) => {
            if(err)
                res.status(406).json(err);
            /* Success */
            res.status(201).json(doc);
        });
};



