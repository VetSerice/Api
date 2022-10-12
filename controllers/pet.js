const PET = require('../models/pet.js');
const VACCINATION_RECORD = require('../models/vaccination-record.js');
const moment = require('moment')
const fs = require('fs');



exports.CreatePet = (req, res, next) => {
    console.log(req.body)
    const pet = new PET({
        namepet: req.body.namepet,
        breed: req.body.breed,
        femaleOrMale: req.body.femaleOrMale,
    }).save((err, pet) => {
        if(err)
            return res.status(406).json(err);
        res.locals.pet = pet;
        next();
    });
};
exports.AddOwnerToPet = (req, res) => {
    PET.findByIdAndUpdate(res.locals.pet._id, { owner: res.locals.client._id },
        err => {
            if(err)
                res.status(406).json(err);

            /* Success */
            res.status(201).json();
        });
};
exports.UploadProfilePicture = async (req, res) => {
    if(req.files){
        const PICTURE = req.files[0];
        console.log(req.files);
        const FOLDER = await CheckPetPicturesFolder();
        if(FOLDER)
            fs.writeFileSync('./uploads/'+req.files[0].fieldname+'.png',req.files[0].buffer);
         res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
};
function CheckPetPicturesFolder(){
    const PET_PICTURES_FOLDER = './uploads';
    try{
        if(!fs.existsSync(PET_PICTURES_FOLDER))
            fs.mkdirSync(PET_PICTURES_FOLDER);
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
};
exports.GetProfilePicture = (req, res) => {
    const PET_PICTURE = 'uploads' + req.query.id + '.png';
    try{
        fs.access(PET_PICTURE, err => {
            if(err)
                return res.status(406).json(err);
            /* Success */
            res.sendStatus(200);
        })
    }catch(err){
        return res.status(406).json(err);
    }
};
exports.GetPet = (req, res) => {
    PET.findById(req.query.id, (err, pet) => {
        console.log(req.query.id,"id")
        if(err)
            res.status(403).json(err);

        if(pet)
            /* Success */
            res.status(200).json(pet);
        else
            res.sendStatus(404);
    });
};
exports.GetPets = (req, res) => {
    PET.find()
        .populate('client')
        .sort([['name', 'ascending']])
        .exec((err, pets) => {
            if(err)
                return res.status(406).json(err);

            /* Success */
            res.status(200).json(pets);
        });
};
exports.AddVaccinationRecord = (req, res) => {
    const actualDate = moment(req.body.nextApplicationDate).add(0, 'days');
    let nextApplicationDate = new Date(actualDate).toString();
    const RECORD = new VACCINATION_RECORD({
        applicationDate: new Date(req.body.applicationDate),
        shot: req.body.shot,
        medic: req.body.medic,
        nextApplicationDate: nextApplicationDate
    });
    var records =[req.body.vaccinationRecord];
    records.push(RECORD);
    PET.findByIdAndUpdate(req.body.id, { vaccinationRecord: records }, err => {
        if(err)
            return res.status(406).json(err);
        res.sendStatus(201);
    });
};

