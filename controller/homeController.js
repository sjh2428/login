const userModel = require("../model/userModel");

const isEqualWithUserId = (idInCookie) => {
    const result = userModel.findUser(idInCookie);
    return result ? [true, result] : [false, result];
}

module.exports = { isEqualWithUserId };