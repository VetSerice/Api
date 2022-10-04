const express = require("express");
const { connect } = require("./db/connect");
const cors = require("cors");

const routerveto = require("./routers/vétérinaire");
const routerUtilisateurs = require("./routers/utilisateur");
const adminRoutes = require("./routers/admin");


const app = express();
const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/admin/auth", adminRoutes);
app.use("/", routerUtilisateurs);
app.use("/", routerveto);

app.use(cors(corsOptions));
connect("mongodb+srv://ourdi:13Laoto13@cluster0.0rofrok.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if (err) {
        console.log("Erreur lors de la connexion à la base de données");
        process.exit(-1);
    } else {
        console.log("Connexion avec la base de données établie");
        app.listen(3000);
        console.log("Attente des requêtes au port 8800");
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});