var express = require('express');
var router = express.Router();
var User = require('../modules/User');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

//login
router.post('/login', function (req, res) {
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
        req.session.name = user.name;
        console.log(user);

        res.json(JSON.stringify({ result: 0 }));
    }); 
});

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