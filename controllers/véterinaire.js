const { ObjectID } = require("bson");
const client = require("../db/connect");
const { Veterinaire } = require("../models/Vétérinaire");
const bcrypt = require("bcrypt");


const ajouterUnVeto = async (req, res) => {
    try {
        let Veterinaire = new Veterinaire(
            req.body.nomdeVeto,
            req.body.prenomveto,
            req.body.emailveto,
            req.body.motDepasseVeto,
            req.body.num,
            req.body.dateDenaisssance,
            req.body.spe,
            req.body.Valid,
            req.body.codePostal,
            req.body.cityv,
            req.body.pays,


        );

        const hash = await bcrypt.genSalt(10);
        Veterinaire.MotDepasse = await bcrypt.hash(utilisateur.MotDepasse, hash);


        let cursor = client.db().collection("Vététinaire").find({ _emailveto: req.body.emailveto });
        let result = await cursor.toArray();
        console.log(result.length );

        if (result.length > 0) {
            return res.status(400).json({ msg: "Cet veto existe deja" });

        }
        if (typeof req.body.telephon != 'number')
        {
            return res.status(400).json({ msg: "veuilly saisir un numéro de téphone valide " });

        }
        if (typeof req.body.noms != 'string' || typeof req.body.prenom != 'string' )
        {
            return res.status(400).json({ msg: "veuilly saisir un nom ou prenom valide " });

        }
        if(!dateIsValid(new Date(req.body.dateDenaisssance)))
        {
            return res.status(400).json({ msg: "la date n'est pas valide" });

        }
        else {

            let result = await client
                .db()
                .collection("Vététinaire")
                .insertOne(utilisateur);
            return res.status(200).json(result);
        }

    } catch (error) {
        console.log(error);
        return  res.status(501).json(error);
    }
};
const getDesVetos = async (req, res) => {
    try {
        let cursor = client
            .db()
            .collection("Vététinaire")
            .find()
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ msg: "Aucun utilisateur trouvé" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};
const getUnVeto = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.db().collection("Vététinaire").find({ _id: id });
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
const updateUnVeto = async (req, res) => {
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
            .collection("Vététinaire")
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
const deleteUnVeto = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let result = await client
            .db()
            .collection("Vététinaire")
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
    ajouterUnVeto,
    getDesVetos,
    getUnVeto,
    updateUnVeto,
    deleteUnVeto,
};