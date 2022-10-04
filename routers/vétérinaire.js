const express = require("express");
const {
    ajouterUnVeto,
    getDesVetos,
    getUnVeto,
    updateUnVeto,
    deleteUnVeto,
} = require("../controllers/véterinaire");
const routerV = express.Router();
module.exports = routerV;

routerV.route("/véterinaire").post(ajouterUnVeto);
routerV.route("/vetos").get(getDesVetos);
routerV.route("/véterinaires/:id").get(getUnVeto);
routerV.route("/véterinaire/:id").put(updateUnVeto);
routerV.route("/véterinaire/:id").delete(deleteUnVeto);
