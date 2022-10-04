const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const Admin = require("../models/Admin");

exports.signup = (req, res) => {
    console.log("req.body====>");

    console.log("req.body====>", req.body);
    bcrypt
        .hash(req.body.password, 10)
        .then(async (hash) => {
            const admin = new Admin({
                username: req.body.username,
                password: hash,
            });
            await admin.save({
            })
                .then(() => res.status(201).json({message: "Admin created"}))
                .catch((error) => res.status(400).json({error}));
        })
        .catch((error) => res.status(500).json({ error }));
};
exports.login = (req, res) => {
    Admin.findOne({ username: req.body.username })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({ error: "Admin not find" });
      }
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Admin wrong password" });
          }
          res.status(200).json({
            adminId: admin._id,
            token: jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getOneAdmin = (req, res) => {
    Admin.findOne(
    {
      _id: req.params.id,
    },
    { password: 0 }
  )
    .then((admin) => {
      res.status(200).json(admin);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
