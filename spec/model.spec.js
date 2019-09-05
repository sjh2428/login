const assert = require("assert");
const userModel = require("../model/userModel");

describe("method should work in userModel", () => {
    it("create user123 and find", () => {
        const info = {
            id: 'id12312321312',
            pwd: '1q2w3e4r',
            name: 'name123',
            gender: 'man',
            birthDay: 3,
            birthMonth: 1,
            birthYear: 2000,
            email: "user123@naver.com",
            tel: '01012341234',
            interests: ['hohoho', 'kakaka', 'kikii']
        };
        userModel.createUser(info, 'user123');
        const newUser = userModel.findUser('user123');
        assert.deepEqual(newUser, info);
    });
    it("delete user123", () => {
        userModel.deleteUser("user123");
        const newUser = userModel.findUser('user123');
        assert.deepEqual(newUser, undefined);
    });
    it("update admin password: 1q2w3e4r!@ -> qwer1234@!", () => {
        const admin = userModel.findUser("adminkey");
        userModel.updateUser("adminkey", {
            ...admin,
            pwd: 'qwer1234@!'
        });
        assert.equal('qwer1234@!', userModel.findUser("adminkey")["pwd"]);
    });
    it("update admin interests: ['interest1', 'interest2', 'interest3'] -> ['', '', '']", () => {
        const admin = userModel.findUser("adminkey");
        userModel.updateUser("adminkey", {
            ...admin,
            interests: ['', '', '']
        });
        assert.deepEqual(['', '', ''], userModel.findUser("adminkey")["interests"]);
    });
});