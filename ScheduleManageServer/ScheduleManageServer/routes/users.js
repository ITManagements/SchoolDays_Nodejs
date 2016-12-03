var express = require('express');
var router = express.Router();
var User = require('../modules/User');


router.post('/find_user', function (req, res) {
        User.get(req.session.username, function (err, result) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else
        {
            var ret = new Object();
            ret.result = 0;
            ret.users = new Array(1);
            users[0] = result.toJSON();
            res.send(JSON.stringify());
        }
    });
});
router.post('/update', function (req, res) {
    var updateUser = new User(req.body);
    updateUser.update(function (err) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else
            res.send(JSON.stringify({ result: 0 }));
    });
});


module.exports = router;