const VET = require('../models/veterinary.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CLIENT = require("../models/client");
const APPOINTMENT = require("../models/appointment");
const DAY_SCHEDULE = require("../models/day_schedule");
const SERVICE = require("../models/service");
const Type = require("../models/type");
const User = require("../models/user");
const PET = require("../models/pet");

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
exports.UpdateVeto =  (req, res) => {
    bcryptjs.hash(req.body.password, 10, async (err, hashed_password) => {
        if (err)
            return res.status(406).json(err);
        /* Success */
        let upddate = await VET.findByIdAndUpdate(req.body.id, {
            _id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            Education: req.body.Education,
            Specialization: req.body.Specialization,
            Availability: req.body.Availability,
            Experience: req.body.Experience,
            Break_Hours: req.body.Break_Hours,
            vetAddress: req.body.vetAddress,
            vetHeadOfMedics: req.body.vetHeadOfMedics,
        }, err => {
            if (err)
                return res.status(406).json(err);
            /* Success */
            return upddate
        });
    });
};
exports.Validate =async (req,res) => {
    VET.findById(req.query.id, async (err, veto) => {
        if (err)
            res.status(406).json();
        console.log(veto.valid)
        if (veto.valid ==false) {
             VET.findByIdAndUpdate(req.query.id, {
                valid: true,
            }, err => {
                if (err)
                    return res.status(406).json(err);
                /* Success */
                 return res.status(200).send({ message: " vous avez bien valider ce compte " });
             });
        }
        if (veto.valid ==true) {
            return res.status(200).send({ message: " compte est deja valider " });

        }

            /* Success */
        //res.status(200).json(veto);
        else
            res.status(404).json();
    });

}

