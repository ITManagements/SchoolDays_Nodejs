var express = require('express');
var router = express.Router();
var User = require('../modules/User');


router.get('/find_user', function (req, res) {
    var name;
    if (req.query.name == undefined)
        name = req.username;
    else
        name = req.query.name;
    User.get(name, function (err, result) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else {
            var ret = new Object();
            ret.result = 0;
            ret.users = new Array(1);
            ret.users[0] = result.toJSON();
            res.json(JSON.stringify(ret));
        }
    });
});
router.post('/update', function (req, res) {
    var updateUser = new User(req.body);
    if (req.body.name == undefined)
        updateUser.name = req.username;
    updateUser.update(function (err) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else
            res.json(JSON.stringify({ result: 0 }));
    });
});


module.exports = router;