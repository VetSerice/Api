const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require("../db/connect");

const loginUser = async (req, res) => {
    try {
        const email = req.body.mail
        const password = req.body.MotDepasse
        let cursor = client.db().collection("user").find({ _mail: email });
        let result = await cursor.toArray();
        if (result.length > 0) {
            let passwordVerification = await bcrypt.compare(password, result[0]._MotDepasse);
            if(!passwordVerification) return  res.status(400).json({ msg: "le mots de passe est  erroné " })
            return res.json({ token: jwt.sign({ _id:result[0]._id }, 'RESTFULAPIs') });

        }

 return res.status(400).json({ msg: "erro" })

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};
const LoginVeto= async (req, res) => {
    try {
        const email = req.body.mail
        const password = req.body.MotDepasse
        let cursor = client.db().collection("Vététinaire").find({ _mail: email });
        let result = await cursor.toArray();
        if (result.length > 0) {
            let passwordVerification = await bcrypt.compare(password, result[0]._MotDepasse);
            if(!passwordVerification) return  res.status(400).json({ msg: "le mots de passe est  erroné " })
            return res.json({ token: jwt.sign({ _id:result[0]._id }, 'RESTFULAPIs') });

        }

        return res.status(400).json({ msg: "erro" })

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

module.exports = {
    loginUser,
    LoginVeto,

};