const express = require('express');
const uuidv1 = require("uuid/v1");
const router = express.Router();
const homeController = require("../controller/homeController");

const haveCookie = (id) => id !== undefined;

router.get('/', (req, res, next) => {
    const cookieId = req.cookies.sessionId;
    const isUser = homeController.isEqualWithUserId(cookieId);
    const [RESULT, DATA] = [0, 1];
    if (haveCookie(cookieId) && isUser[RESULT]) {
        return res.render('index', { title: 'Login' , login: true, userData: isUser[DATA]});
    }
    res.cookie("sessionId", uuidv1());
    res.render('index', { title: 'Login', login: false });
});

router.get('/logout', (req, res, next) => {
    res.cookie("sessionId", uuidv1());
    res.redirect('/');
});

router.post('/login', (req, res, next) => {
    const password = req.body.login_password
    const findId = homeController.isThereId(req.body.login_id);
    const [RESULT, KEY] = [0, 1];
    const checkPass = findId[RESULT] ? homeController.isEqualPassword(findId[KEY], password) : false;
    // id가 존재하고 비밀번호가 일치한다면
    if (checkPass) {
        res.cookie("sessionId", findId[KEY]);
    }
    res.end();
});

router.post('/sign-in', (req, res, next) => {

});

module.exports = router;
