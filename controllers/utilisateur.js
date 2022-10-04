const { ObjectID } = require("bson");
const client = require("../db/connect");
const { Utilisateur } = require("../models/utilisateur");
const bcrypt = require("bcrypt");

function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
}
const ajouterUtilisateur = async (req, res) => {
    try {
        let utilisateur = new Utilisateur(
            req.body.noms,
            req.body.prenom,
            req.body.mail,
            req.body.telephon,
            req.body.dateDeNaisssance,
            req.body.adresse,
            req.body.MotDepasse,

    );

        const hash = await bcrypt.genSalt(10);
        utilisateur.MotDepasse = await bcrypt.hash(utilisateur.MotDepasse, hash);


        let cursor = client.db().collection("user").find({ _mail: req.body.mail });
        let result = await cursor.toArray();
        console.log(result.length );

        if (result.length > 0) {
            return res.status(400).json({ msg: "Cet utilisateur existe deja" });

        }
        if (typeof req.body.telephon != 'number')
        {
            return res.status(400).json({ msg: "veuilly saisir un numéro de téphone valide " });

        }
        if (typeof req.body.noms != 'string' || typeof req.body.prenom != 'string' )
        {
            return res.status(400).json({ msg: "veuilly saisir un nom ou prenom valide " });

        }
        if(!dateIsValid(new Date(req.body.dateDeNaisssance)))
        {
            return res.status(400).json({ msg: "la date n'est pas valide" });

        }
        else {

            let result = await client
                .db()
                .collection("user")
                .insertOne(utilisateur);
            return res.status(200).json(result);
        }

    } catch (error) {
        console.log(error);
        return  res.status(501).json(error);
    }
};
const getUtilisateurs = async (req, res) => {
    try {
        let cursor = client
            .db()
            .collection("user")
            .find()
            .sort({ nom: 1 });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(204).json({ msg: "Aucun utilisateur trouvé" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};
const getUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.db().collection("user").find({ _id: id });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};
const updateUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let noms = req.body.noms;
        let adresse = req.body.adresse;
        let mail = req.body.mail;
        let dateDeNaisssance = req.body.dateDeNaisssance;
        let motDepasse = req.body.MotDepasse;
        let telephone = req.body.telephone;
        let prenom = req.body.prenom;

        let result = await client
            .db()
            .collection("user")
            .updateOne({ _id: id }, { $set: { noms, adresse, telephone,prenom,mail,motDepasse,dateDeNaisssance} });

        if (result.modifiedCount === 1) {
            res.status(200).json({ msg: "Modification réussie" });
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};
const deleteUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let result = await client
            .db()
            .collection("utilisateurs")
            .deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(200).json({ msg: "Suppression réussie" });
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);

        res.status(501).json(error);
    }
};
module.exports = {
    ajouterUtilisateur,
    getUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
};