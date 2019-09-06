const userModel = require("../model/userModel");

/**
 * 세션 아이디를 통해 user db를 탐색하여 일치하는 데이터를 찾아주는 function
 * 
 * @param {String} idInCookie 쿠키에 들어있는 id값을 넣어주어야 함
 * @returns {Array} [result(Boolean), userObject(Object)] 형태로 return
 */
const isEqualWithUserId = (idInCookie) => {
    const result = userModel.findUser(idInCookie);
    return result ? [true, result] : [false, result];
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

module.exports = { isEqualWithUserId, isThereId, isEqualPassword };