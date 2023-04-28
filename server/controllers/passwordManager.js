const bcrypt = require('bcrypt');
const salt = 16;

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