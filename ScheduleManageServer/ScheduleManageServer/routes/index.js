var express = require('express');
var router = express.Router();
var User = require('../modules/User');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

//login
router.get('oauth2/access_token', function (req, res) {
    User.get(req.body['username'], function (err, user) {
        //console.log(req);
        if (!user) {
            console.log('notExit');
            res.send(JSON.stringify({ result: 1 }));
        }
        if (user.password != req.body.password) {
            console.log('errPaw');
            res.send(JSON.stringify({ result: 1 }));
        }
        req.session.userName = user.userName;
        res.send(JSON.stringify({ result: 0 }));
    }); 
});

//
router.get('/add_user', function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else
            res.send(JSON.stringify({ result: 0 }));
    });
});

module.exports = router;