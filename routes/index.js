const express = require('express');
const uuidv1 = require("uuid/v1");
const router = express.Router();
const homeController = require("../controller/homeController");

const haveCookie = (id) => id !== undefined;

/* GET home page. */
router.get('/', function(req, res, next) {
    const cookieId = req.cookies.sessionId;
    const isUser = homeController.isEqualWithUserId(cookieId);
    const [RESULT, DATA] = [0, 1];
    if (haveCookie(cookieId) && isUser[RESULT]) {
        res.render('index', { title: 'Login' , login: true, userData: isUser[DATA]});
    }
    res.cookie("sessionId", uuidv1());
    res.render('index', { title: 'Login', login: false });
});

router.get('/logout', function(req, res, next) {
    res.cookie("sessionId", uuidv1());
    res.render('index', { title: 'Login' });
});

router.post('/login', function(req, res, next) {

});

router.post('/sign-in', function(req, res, next) {

});

module.exports = router;
