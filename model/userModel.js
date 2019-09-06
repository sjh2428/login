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
    /**
     * DB에 새로운 유저를 만드는 method
     * 
     * @param {Object} info 새로 만들 유저 정보를 담은 객체
     * @param {String} key 기본 값은 uuidv1()이지만 테스팅을 위해 값을 넣을 수 있도록 하였음
     */
    createUser(info, key = uuidv1()) {
        this.db.set(key, new User(info)).write();
        this.db.get(key).assign({interests: info.interests}).write();
    }

    /**
     * DB내에 key값을 PK로 하는 User가 존재하면 해당 User의 객체를 return하는 method
     * 
     * @param {String} key user의 PK
     * @returns {Object} key값에 해당하는 user의 object
     */
    findUser(key) {
        return this.db.get(key).value();
    }

    /**
     * 유저 정보를 업데이트하는 method
     * 
     * @param {String} key update를 원하는 user의 PK
     * @param {Object} newInfo update할 새 user info Spread Operator를 사용하는 것을 권장
     */
    updateUser(key, newInfo) {
        this.db.set(key, newInfo).write();
        this.db.get(key).assign({interests: newInfo.interests}).write();
    }

    /**
     * key에 대응되는 PK를 가지는 User를 삭제하는 method
     * 
     * @param {String} key delete를 원하는 user의 PK
     */
    deleteUser(key) {
        this.db.unset(key).write();
    }

    /**
     * DB내의 모든 데이터를 return하는 method
     * 
     * @returns {Object} DB내의 모든 Data
     */
    getAllData() {
        return this.db.value();
    }
}

module.exports = new UserModel();