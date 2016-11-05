var db = require('./dbControl');

function Schedule(schedule) {
    if (schdeule.schedule_id == undefined)
        this.schedule_id = null;
    else
        this.schedule_id = schdeule.schedule_id;
    this.name = schedule.name;
    this.type = schedule.type;
    this.brief = schedule.brief;
    this.date = new Date(schdeule.date);
    this.title = schedule.title;
    this.span = schedule.span;
    this.details = schedule.details;
    if (schdeule.date_set == undefined)
        this.date_set = null;
    else
        this.date_set = schedule.date_set;
};

module.exports = Schedule;

Schedule.prototype.toJSON = function toJSON() {
    var schedule = {
        schedule_id: this.schedule_id,
        name: this.name,
        type: this.type,
        brief: this.brief,
        date: this.date.toJSON(),
        title: this.title,
        span: this.span,
        details: this.details,
        date_set: this.date_set
    };
    return schedule;
}

Schedule.prototype.save = function save(callback) {
    this.date_set = new Date();
    db.insert('schedules', null, schedule, function (err, result) {
        this.schedule_id = result.insertedId;
        callback(err);
    });
}

Schedule.get = function get(id, callback) {
    db.get('schedules', {schedule_id: id}, function (err, result) {
        if (result) {
            var newSchedule = new Schedule(result);
            callback(err, result);
        }
        else {
            callback(err, null);
        }
    });
}

Schedule.prototype.update = function update(callback) {
    this.date_set = new Date();
    var s = this.toJSON();
    var id = s.schedule_id;
    delete s.schedule_id;
    dbControl.update('schedules', { _id: id }, s, callback);
}

Schedule.findBySelector = function findBySelector(selector, callback) {
    db.findBySelector('schedules', selector, function (err, result) {
        var schedules = new Array(result.length);
        for (var i = 0; i < schedules.length; i++)
            schedules[i] = new Schedule(result[i]);
        callback(err, schedules);
    });
}

