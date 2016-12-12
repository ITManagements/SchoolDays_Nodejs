var express = require('express');
var router = express.Router();
var User = require('../modules/User');
var MyCookie = require('../modules/mCookie');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
//login
function login(req, res) {
    //console.log(req.body);
    User.get(req.body['name'], function (err, user) {
        //console.log(req);

        if (!user) {
            console.log('notExit');
            res.json(JSON.stringify({ result: 1 }));
            return;
        }
        if (user.password != req.body.password) {
            console.log('errPaw');
            res.json(JSON.stringify({ result: 1 }));
            return;
        }
        MyCookie.setCookie(user.name, function (err, result) {
            res.json(JSON.stringify({ result: 0, access_token: result.cookieid, expires_in: 2592000 }));
        });
        //console.log(user);
    });
}

router.post('/login', login);
//
router.post('/add_user', function (req, res) {
    var newUser = new User(req.body);
    //console.log(req.body);
    newUser.save(function (err) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else
            res.json(JSON.stringify({ result: 0 }));
    });
});

module.exports = router;