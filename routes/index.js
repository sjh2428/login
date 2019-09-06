const express = require('express');
const uuidv1 = require("uuid/v1");
const router = express.Router();
const homeController = require("../controller/homeController");

const haveCookie = (id) => id !== undefined;

router.get('/', async(req, res) => {
    const [RESULT, DATA] = [0, 1];
    const cookieId = req.cookies.sessionId;
    const isUser = await homeController.isEqualWithUserId(cookieId);
    if (haveCookie(cookieId) && isUser[RESULT]) {
        return res.render('index', { title: 'Login' , login: true, userData: isUser[DATA]});
    }
    res.cookie("sessionId", uuidv1());
    res.render('index', { title: 'Login', login: false });
});

router.get('/logout', (req, res) => {
    res.cookie("sessionId", uuidv1());
    res.redirect('/');
});

router.post('/login', async(req, res) => {
    const [RESULT, KEY] = [0, 1];
    const password = req.body.login_password
    const findId = await homeController.isThereId(req.body.login_id);
    const checkPass = findId[RESULT] ? await homeController.isEqualPassword(findId[KEY], password) : false;
    // id가 존재하고 비밀번호가 일치한다면
    if (checkPass) {
        res.cookie("sessionId", findId[KEY]);
    }
    res.end();
});

router.post('/sign-up', async(req, res) => {
    const KEY = 1;
    homeController.pushNewUser(req.body);
    const findId = await homeController.isThereId(req.body.id.trim());
    res.cookie("sessionId", findId[KEY]);
    res.end();
});

module.exports = router;
