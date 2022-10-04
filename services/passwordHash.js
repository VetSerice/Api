const bcrypt = require("bcrypt");

async function hashPassword(pass) {
     pass = bcrypt.hashSync(params.password, 10);

}

module.exports = { hashPassword};