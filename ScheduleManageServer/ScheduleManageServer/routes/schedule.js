var express = require('express');
var router = express.Router();
var Schedule = requier('../modules/Schedule')

router.post('/add_schedule', function (req, res) {
    var newSchedule = new Schedule(req.body);
    newSchedule.save(function (err) {
    });
});

router.post('/remove', function (req, res) {
    Schedule.remove(req.body['schedule_id'], function (err) {

    });
});


router.post('/find_schedules', function (req, res) {
    Schedule.findBySelector(req.body, function (err, result) {
        var schedules = new Array(result.length)
        for (var i = 0; i < result.length; i++)
            schedules = result.toJSON();
    });
});

router.post('/update', function (req, res) {
    var updateSchedule = new Schedule(req.body);
    updateSchedule.update(function (err) {

    });
});


module.exports = router;