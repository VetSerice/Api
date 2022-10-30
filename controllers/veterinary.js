const VET = require('../models/veterinary.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BreackDay = require("../models/Break_Hours");
const PET = require("../models/pet");
const APPOINTMENT = require("../models/appointment");
const {GetPetID} = require("./pet");
const {GetServiceID} = require("./service");
const DAY_SCHEDULE = require("../models/day_schedule");


exports.SignUpVeterinary = async (req, res) => {
    const body = req.body;
    //check si les donné son vide
    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    // check si l'email existe
    const user = await VET.findOne({email: body.email});
    if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const vet = new VET({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                vetAddress: req.body.vetAddress,
                valid: false
            });
            vet.save().then(() => {
                res.status(201).json({message: "vet created"});
            }).catch((error) => res.status(400).json({error}));


        })
            .catch((error) => res.status(500).json({error}));

    }else {
        res.status(401).json({ error: "email exist  exist" });
    }

};
exports.LoginVeterinary = (req, res) => {
    VET.findOne({ username: req.body.username })
        .then((veterenary) => {
            if (!veterenary) {
                return res.status(401).json({ error: "veterenary not find" });
            }
            bcrypt
                .compare(req.body.password,veterenary.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "veterenary wrong password" });
                    }
                    console.log(valid,"valideee");
                    const ACCESS_TOKEN = jwt.sign(veterenary.toJSON(), process.env.ACCESS_TOKEN_SECRET)
                    res.status(200).json({
                        msg: 'LogIn Success',
                        veterenary: {
                            _id: veterenary._id,
                            email: veterenary.email,
                            name: veterenary.name
                        },
                        accessToken: ACCESS_TOKEN
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));

};
exports.CreateVeterinary = (req, res) => {
    console.log("req.body====>", req.body);
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const vet = new VET({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            vetAddress:req.body.vetAddress,
            valid: false
        });
        vet.save().then(() => {
            res.status(201).json({ message: "vet created" });
        }).catch((error) => res.status(400).json({ error }));

    })
        .catch((error) => res.status(500).json({ error }));
};
exports.GetVeterinarys = (req, res) => {
    VET.find()
        .sort([['name', 'ascending']])
        .exec((err, vets) => {
            if(err)
                return res.sendStatus(406);

            res.json(vets);
        });
};
exports.GetVeto = (req, res) => {
    VET.findById(req.query.id, (err, veto) => {
        if(err)
            res.status(406).json();

        if(veto)
            /* Success */
            res.status(200).json(veto);
        else
            res.status(404).json();
    });
};
exports.GetVetID =async (id) => {
    let veto = await VET.findById(id)
    if(!veto)
         throw Error("veto n'existe pas ")
    return veto
};
exports.UpdateVeto =  async (req, res) => {
    let upddate = await VET.findByIdAndUpdate(req.query.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        Education: req.body.Education,
        Specialization: req.body.Specialization,
        Experience: req.body.Experience,
        //Break_Hours: daywork,
        vetAddress: req.body.vetAddress,
        vetHeadOfMedics: req.body.vetHeadOfMedics,
    },(err ,doc) => {
        if(err)
            res.status(406).json(err);
        /* Success */
        console.log(doc)
        res.status(201).json(doc);
    })



};
exports.CreateBreakDay= (req, res, next) => {
    const breakday = new BreackDay ({
        day:req.body.Break_Hours.day,
    }).save((err, daywork) => {
        if(err)
            return res.status(406).json(err);
        res.locals.daywork = daywork;
        next();
    });
};
exports.hour = (req, res) => {
    BreackDay.find()
        .populate('veterinary')
        .exec((err, pets) => {
            if(err)
                return res.status(406).json(err);

            /* Success */
            res.status(200).json(pets);
        });
};
async function GetBreakhourIID(Break_Hours) {
    let veto = await BreackDay.findById(Break_Hours)
    if(!veto)
        throw Error("veto n'existe pas ")
    return veto
}
exports.GetDaybreakhours = async (req, res, next) => {
    let dayList =[];
    let lS = await VET.findById({_id:req.query.id})
   // console.log(req.query.id)
   // console.log(lS)
    if (!lS){
        return res.status(411).send({ message: "aucune donné trouver " });
    }else{
        for (const app of lS.Break_Hours) {
            console.log(app)
            dayList.push(await GetBreakhourIID(app))
        }
        return res.status(200).send(dayList);

    }
}
exports.Validate =async (req,res) => {
    let lS = await VET.findById({_id:req.query.id})
    console.log(req.query.id)
    console.log(lS)
    if (!lS){
        return res.status(411).send({ message: "aucune donné trouver " });
    }else{
        if (lS.valid==false){
            VET.updateOne({valid:true})
            return res.status(200).send({ message: "deja valider " });

        }
        if (lS.valid==true){
            return res.status(411).send({ message: "deja mis àjour  " });
        }
    }
}

exports.CreateBreakDayVeto= (req, res, next) => {
    VET.findByIdAndUpdate(req.query.id, {Break_Hours:[]}, (err ,doc) => {
        if(err){
            console.error(err,"messsage rroo")
            // res.status(406).json(err);
        }
        // res.status(201).json({ message: "day created"});
    });
    console.log(req.body)
    for (let day of req.body){
        try {
            const breakday = new BreackDay ({
                day:day.day,

            }).save((err, daywork) => {
                if(err){
                    console.error(err,"messsage rroo")
                    // res.status(408).json(err);
                };
                VET.findByIdAndUpdate(req.query.id, { $push:{Break_Hours:daywork._id} }, (err ,doc) => {
                    if(err){
                        console.error(err,"messsage rroo")
                        // res.status(406).json(err);
                    }
                    // res.status(201).json({ message: "day created"});
                });
            })
        }catch (err){
            console.error(err)
        }


    }
    return res.status(200).json({message :"sucss"});

};