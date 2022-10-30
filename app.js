const express = require("express");
const cors = require("cors");
const USER_ROUTER = require('./router/user');
const mongoose = require("mongoose");
const CLIENT_ROUTER = require('./router/client');
const PET_ROUTER = require('./router/pet');
const SERVICE_ROUTER = require('./router/service');
const DAY_SCHEDULE_ROUTER = require('./router/schedule');
const BREED_ROUTER = require('./router/breed');
const VETERINARY = require('./router/veterinary');
const APPOINTMENT = require('./router/appoitement');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', USER_ROUTER);
app.use('/clients', CLIENT_ROUTER);
app.use('/pets', PET_ROUTER);
app.use('/services', SERVICE_ROUTER);
app.use('/dayschedules', DAY_SCHEDULE_ROUTER);
app.use('/breeds', BREED_ROUTER);
app.use('/veterinarys', VETERINARY);
app.use('/appointementeee', APPOINTMENT);



app.use(cors())
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(connect => console.log('connected to mongodb..'))
    .catch(e => console.log('could not connect to mongodb', e))


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});