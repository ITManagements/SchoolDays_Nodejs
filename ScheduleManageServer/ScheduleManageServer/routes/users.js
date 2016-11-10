var express = require('express');
var router = express.Router();
var User = require('../modules/User')


/* GET users listing. */
router.post('/add_user', function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
    });
});

router.post('/find_user', function (req, res) {
    User.get(req.body['name'], function (err, result) {
        var users = new Array(1);
        users[0] = result.toJSON();
    });
});
router.post('/update', function (req, res) {
    var updateUser = new User(req.body);
    updateUser.update(function (err) {

    });
});


module.exports = router;