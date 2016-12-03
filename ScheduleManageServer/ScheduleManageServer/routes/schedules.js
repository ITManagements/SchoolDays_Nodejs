var express = require('express');
var router = express.Router();
var Schedule = require('../modules/Schedule');

router.post('/add_schedule', function (req, res) {
    var newSchedule = new Schedule(req.body);
    newSchedule.name = req.session.username;
    newSchedule.save(function (err, result) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else {
            result.result = 0;
            res.send(JSON.stringify(result));
        }
            
    });
});

router.post('/remove', function (req, res) {
    Schedule.remove(req.body['schedule_id'], function (err) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else
            res.send(JSON.stringify({ result: 0 }));
    });
});


router.post('/find_schedules', function (req, res) {
    Schedule.findBySelector(req.body, function (err, result) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else {
            var ret = new Object();
            ret.result = 0;
            result.schedules = new Array(result.length)
            for (var i = 0; i < result.length; i++)
                result.schedules[i] = result.toJSON();
            res.send(JSON.stringify(ret));
        }
    });
});

router.post('/update', function (req, res) {
    var updateSchedule = new Schedule(req.body);
    updateSchedule.update(function (err) {
        if (err)
            res.send(JSON.stringify({ result: 1 }));
        else
            res.send(JSON.stringify({ result: 0, data_set: updateSchedule.date_set }));
    });
});


module.exports = router;