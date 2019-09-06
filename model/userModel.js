const lowdb = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("./model/db.json");
const uuidv1 = require("uuid/v1");

const User = require("./User");

class UserModel {
    constructor() {
        this.db = lowdb(adapter);
        this.db.defaults({
            "adminkey": {
                "id": "admin",
                "pwd": "1q2w3e4r!@",
                "name": "어드민",
                "birthDay": 12,
                "birthMonth": 3,
                "birthYear": 1,
                "gender": "man",
                "email": "qwer@naver.com",
                "tel": "01044444444",
                "interests": ["interest1", "interest2", "interest3"]
            }
        }).write();
    }
    createUser(info, key = uuidv1()) {
        this.db.set(key, new User(info)).write();
        this.db.get(key).assign({interests: info.interests}).write();
    }
    findUser(key) {
        return this.db.get(key).value();
    }
    updateUser(key, newInfo) {
        this.db.set(key, newInfo).write();
        this.db.get(key).assign({interests: newInfo.interests}).write();
    }
    deleteUser(key) {
        this.db.unset(key).write();
    }
    getAllData() {
        return this.db.value();
    }
}

module.exports = new UserModel();