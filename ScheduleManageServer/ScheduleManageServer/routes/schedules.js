var express = require('express');
var router = express.Router();
var Schedule = require('../modules/Schedule');

router.post('/add_schedule', function (req, res) {
    var newSchedule = new Schedule(req.body);
    newSchedule.name = req.username;
    newSchedule.save(function (err, result) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else {
            result.result = 0;
            result.name = req.username;
            result.data_set = newSchedule.date_set.toJSON();
            res.json(JSON.stringify(result));
        }
    });
});

router.post('/remove', function (req, res) {
    Schedule.remove(req.body['schedule_id'], function (err) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else
            res.json(JSON.stringify({ result: 0 }));
    });
});


router.get('/find_schedules', function (req, res) { 
    Schedule.findBySelector(req.query, function (err, result) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else {
            var ret = new Object();
            ret.result = 0;
            ret.schedules = new Array(result.length);
            for (var i = 0; i < result.length; i++)
                ret.schedules[i] = result[i].toJSON();
            res.json(JSON.stringify(ret));
        }
    });
});

router.post('/update', function (req, res) {
    var updateSchedule = new Schedule(req.body);
    updateSchedule.update(function (err) {
        if (err)
            res.json(JSON.stringify({ result: 1 }));
        else
            res.json(JSON.stringify({ result: 0, data_set: updateSchedule.date_set }));
    });
});


module.exports = router;