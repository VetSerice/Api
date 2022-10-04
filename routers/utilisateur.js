const express = require("express");
const {
    ajouterUtilisateur,
    getUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
} = require("../controllers/utilisateur");
const router = express.Router();

const {
    loginUser,
} = require("../controllers/authcontroller");
module.exports = router;

router.route("/utilisateurs").post(ajouterUtilisateur);
router.route("/utilisateurs").get(getUtilisateurs);
router.route("/utilisateurs/:id").get(getUtilisateur);
router.route("/utilisateurs/:id").put(updateUtilisateur);
router.route("/utilisateurs/:id").delete(deleteUtilisateur);


router.route("/login").post(loginUser);
