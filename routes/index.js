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
        res.render('index', { title: 'Login' , login: true, userData: isUser[DATA]});
    }
    res.cookie("sessionId", uuidv1());
    res.render('index', { title: 'Login', login: false });
});

router.get('/logout', (req, res, next) => {
    res.cookie("sessionId", uuidv1());
    res.render('index', { title: 'Login', login: false });
});

router.post('/login', (req, res, next) => {

});

router.post('/sign-in', (req, res, next) => {

});

module.exports = router;
