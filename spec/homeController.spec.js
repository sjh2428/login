const assert = require("assert");
const userModel = require("../model/userModel");
const homeController = require("../controller/homeController");

describe("getUserData should return correct Object", () => {
    it("adminkey key test", () => {
        assert.deepEqual(homeController.getUserData("adminkey"), {
            "id": "admin",
            "pwd": "qwer1234@!",
            "name": "어드민",
            "birthDay": 12,
            "birthMonth": 3,
            "birthYear": 1,
            "gender": "man",
            "email": "qwer@naver.com",
            "tel": "01044444444",
            "interests": ["", "", ""]
        });
    });
    it("admikey key test", () => {
        assert.deepEqual(homeController.getUserData("key"), undefined);
        assert.notDeepEqual(homeController.getUserData("key"), {
            "id": "admin",
            "pwd": "qwer1234@!",
            "name": "어드민",
            "birthDay": 12,
            "birthMonth": 3,
            "birthYear": 1,
            "gender": "man",
            "email": "qwer@naver.com",
            "tel": "01044444444",
            "interests": ["", "", ""]
        });
    });
});

describe("isThereId should return correct Array", () => {
    it("there is id 'admin'", () => {
    assert.deepEqual(homeController.isThereId("admin"), [true, "adminkey"]);
    });
    it("there is id 'sjh2428'", () => {
        assert.deepEqual(homeController.isThereId("sjh2428"), [true, "c75c5630-d071-11e9-a538-b93f9899c8de"]);
    });
    it("there is not id 'sjh2427'", () => {
        assert.deepEqual(homeController.isThereId("sjh2427"), [false, undefined]);
    });
});

describe("isEqualPassword should return correct Boolean", () => {
    it("is equal password with db for admin", () => {
        assert.equal(homeController.isEqualPassword("adminkey", "qwer1234@!"), true);
        assert.equal(homeController.isEqualPassword("adminkey", "qwer1234@"), false);
    });
    it("is equal password with db for sjh2428", () => {
        assert.equal(homeController.isEqualPassword("c75c5630-d071-11e9-a538-b93f9899c8de", "qwer1234@!"), true);
        assert.equal(homeController.isEqualPassword("c75c5630-d071-11e9-a538-b93f9899c8de", "qwer1234@"), false);
    });
});

describe("pushNewUser should add user to db", () => {
    it("is add new user", () => {
        // console.log(Object.keys(userModel.getAllData()).length);
        const originLength = Object.keys(userModel.getAllData()).length;
        homeController.pushNewUser({
            "id": "test1",
            "pwd": "test1",
            "name": "test1",
            "birthYear": "2000",
            "birthMonth": "10",
            "birthDay": "10",
            "gender": "man",
            "email": "test1@naver.com",
            "tel": "01001332012",
            "interests": "1234, 5678, 901011"
        });
        const afterLength = Object.keys(userModel.getAllData()).length;
        assert.equal(originLength, afterLength - 1);
    });
});