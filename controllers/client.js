const CLIENT = require('../models/client.js');
const bcrypt = require("bcrypt");
const VET = require("../models/veterinary");
const jwt = require("jsonwebtoken");
//const APPOINTMENT = require("../models/appointment");
const DAY_SCHEDULE = require("../models/day_schedule");
const SERVICE = require("../models/service");
const {GetPetID} = require("./pet");

exports.CreateClient = (req, res, next) => {
    var pets = [];
    pets.push(res.locals.pet._id);
    const client = new CLIENT({
        nameClient: req.body.nameClient,
        phone: req.body.phone,
        pets: pets,
    }).save((err, client) => {if(err)
        return next(err);
        /* Success */
        res.locals.client = client;
        res.status(201).json({ message: "client created" });
        next();
    });

};
exports.SignUpClient = async (req, res) => {
    var pets = [];

    const body = req.body;
    //check si les donné son vide
    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    // check si l'email existe
    const user = await CLIENT.findOne({email: body.email});
    if (!user) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const clien = new CLIENT({
                nameClient: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                pets: pets,
                address: req.body.address
            });
            clien.save().then(() => {
                res.status(201).json({message: "client created"});
            }).catch((error) => res.status(400).json({error}));


        })
            .catch((error) => res.status(500).json({error}));

    }else {
        res.status(401).json({ error: "email exist  exist" });
    }

};
exports.GetClients = (req, res) => {
    CLIENT.find()
        .populate('client')
        .sort([['name', 'ascending']])
        .exec((err, clients) => {
            if(err)
                return res.sendStatus(406);

            res.json(clients);
        });
};
exports.GetClient = (req, res) => {
    var list = []
    CLIENT.findById(req.query.id, async (err, client) => {
        if (err)
            res.status(406).json();
        if (client){
            for (app of client.pets) {
            let pet = await GetPetID(app._id)
                console.log(pet,"pet")
            list.push(pet)
        }
            const obj ={client, list}
            res.status(200).json(obj);}
            /* Success */

    else
        res.status(404).json();

    });
};
exports.AddPetToClient = (req, res, next) => {
    CLIENT.findById(req.body.id, (err, client) => {
        if(err)
            res.status(406).json(err);
        let pets = client.pets;
        pets.push(res.locals.pet);

        CLIENT.findByIdAndUpdate(req.body.id, { pets: pets },
            (err, client) => {
                if(err)
                    res.status(406).json(err);
                res.locals.client = client;
                next();
            });
    });
};
exports.LoginClient = (req, res) => {
    CLIENT.findOne({ username: req.body.username })
        .then((client) => {
            if (!client) {
                return res.status(401).json({ error: "Client not find" });
            }
            bcrypt
                .compare(req.body.password,client.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Client wrong password" });
                    }
                    console.log(valid,"valideee");
                    const ACCESS_TOKEN = jwt.sign(client.toJSON(), process.env.ACCESS_TOKEN_SECRET)
                    res.status(200).json({
                        msg: 'LogIn Success',
                        client: {
                            _id: client._id,
                            email: client.email,
                            name: client.name
                        },
                        accessToken: ACCESS_TOKEN
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));

};
exports.GetClientID =  (id) => {
    return CLIENT.findById(id)
};




