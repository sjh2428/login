const userModel = require("../model/userModel");

/**
 * user db에서 key값과 matching되는 데이터를 찾아주는 function
 * 
 * @param {String} key 
 * @returns {Object} user object
 */
const getUserData = (key) => {
    return userModel.findUser(key);
}

/**
 * 세션 아이디를 통해 user의 key값을 찾아주는 function
 * 
 * @param {String} id sessionId in cookies
 * @returns {Array} [result(Boolean), userKey(String)] 형태로 return
 */
const isThereId = (id) => {
    const allData = userModel.getAllData();
    for (let key in allData) {
        if (allData[key].id === id) {
            return [true, key];
        }
    }
    return [false, undefined];
}

/**
 * userKey에 해당하는 user를 탐색하여 입력받은 password와 일치하는지 확인해주는 function
 * @param {String} key userKey
 * @param {String} password inputed password
 */
const isEqualPassword = (key, password) => {
    const userPassword = userModel.findUser(key).pwd;
    return password === userPassword;
}

/**
 * make prettier info object
 * 
 * @param {Object} info req.body object
 * @returns {Object} trimmed and splited data
 */
const makePrettyInfo = (info) => {
    const result = {};
    for(let key in info) {
        result[key] = info[key].trim();
    }
    result["interests"] = info["interests"].split(",");
    return result;
}

/**
 * After make prettier info object, create new user
 * 
 * @param {Object} info req.body object
 */
const pushNewUser = (info) => {
    info = makePrettyInfo(info);
    userModel.createUser(info);
}

module.exports = { getUserData, isThereId, isEqualPassword, pushNewUser };