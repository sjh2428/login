const express = require('express');
const uuidv1 = require("uuid/v1");
const router = express.Router();
const homeController = require("../controller/homeController");
const session = require("../session");

const haveCookie = (id) => id !== undefined;

router.get('/', async(req, res) => {
    const [RESULT, KEY] = [0, 1];
    const cookieId = req.cookies.sessionId;
    const sessionId = session.isSessionKey(req.cookies.sessionId); // cookie의 값으로 현재 세션 목록을 탐색하여 존재하는 Session값인지 확인
    if (haveCookie(cookieId) && sessionId[RESULT]) { // 쿠키가 존재하고 쿠키에 매칭되는 세션 아이디가 있다면
        return res.render('index', {
            title: 'Login',
            login: true,
            userData: homeController.getUserData(sessionId[KEY])});
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
    const password = req.body.login_password;
    const findId = await homeController.isThereId(req.body.login_id);
    const checkPass = findId[RESULT] ? await homeController.isEqualPassword(findId[KEY], password) : false;
    // id가 존재하고 비밀번호가 일치한다면
    if (checkPass) {
        res.cookie("sessionId", session.makeSession(findId[KEY]));
    }
    res.end();
});

router.post('/sign-up', async(req, res) => {
    const KEY = 1;
    homeController.pushNewUser(req.body);
    const findId = await homeController.isThereId(req.body.id.trim());
    res.cookie("sessionId", session.makeSession(findId[KEY]));
    res.end();
});

module.exports = router;
