var db = require('./dbControl');

function Schedule(schedule) {
    if (schdeule.schedule_id == undefined)
        this.schedule_id = null;
    else
        this.schedule_id = schdeule.schedule_id;
    this.name = schedule.name;
    this.date = new Date(schdeule.date);
    this.title = schedule.title;
    this.span = schedule.span;
    this.details = schedule.details;
    if (schdeule.edit_time == undefined)
        this.edit_time = null;
    else
        this.edit_time = schedule.edit_time;
};

module.exports = Schedule;

Schedule.prototype.toJSON = function save(callback) {
    var schedule = {
        schedule_id: this.schedule_id,
        name: this.name,
        date: this.date.toJSON(),
        title: this.title,
        span: this.span,
        details: this.details,
        edit_time = this.edit_time
    };
}

Schedule.prototype.save = function save(callback) {
    this.date = new Date();
    db.insert('schedules', null, schedule, function (err, result) {
        this.schedule_id = result.insertedId;
        callback(err);
    });
}

Schedule.get = function (id, callback) {
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
    var s = this.toJSON();
    var id = s.schedule_id;
    delete s.schedule_id;
    dbControl.update('schedules', { _id: id }, s, callback);
}