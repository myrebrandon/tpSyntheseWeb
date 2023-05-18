require("dotenv").config();
const bcrypt = require('bcrypt');
const salt = process.env.SALT;

async function hashage(pswd) {
    let newPwd;
    newPwd = await bcrypt.hash(pswd, salt)
    return newPwd;
}

async function compare(netPwd, hashPwd) {
    res = await bcrypt.compare(netPwd, hashPwd);
    return res;
}

module.exports = {hashage, compare};