var db = require('./dbControl');


function Schedule(schedule) {
    if (schedule._id != undefined)
        this.schedule_id = schedule._id;
    else if (schedule.schedule_id == undefined)
        this.schedule_id = null;
    else
        this.schedule_id = schedule.schedule_id;

    if (schedule.username != undefined)
        this.name = schedule.username;
    else
        this.name = schedule.name;

    this.type = schedule.type;
    this.brief = schedule.brief;
    this.date = new Date(schedule.date);
    this.title = schedule.title;
    this.span = schedule.span;
    this.details = schedule.details;

    if (schedule.dateset != undefined)
        this.date_set = new Date(schedule.dateset);
    else if (schedule.date_set == undefined)
        this.date_set = null;
    else
        this.date_set = new Date(schedule.date_set);
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
        date_set: this.date_set.toJSON()
    };
    return schedule;
}

Schedule.prototype.toData = function toDate() {
    var schedule = {
        username: this.name,
        type: this.type,
        brief: this.brief,
        date: this.date,
        title: this.title,
        span: this.span,
        details: this.details,
        dateset: this.date_set
    };
    return schedule;
}


Schedule.prototype.save = function save(callback) {
    this.date_set = new Date();
    db.insert('schedules', null, this.toData(), function (err, result) {
        this.schedule_id = result.insertedIds[0].toJSON();
        callback(err, this.schedule_id);
    });
}

Schedule.get = function get(id, callback) {
    db.get('schedules', { _id: id }, function (err, result) {
        if (result) {
            callback(err, new Schedule(result));
        }
        else {
            callback(err, null);
        }
    });
}

Schedule.prototype.update = function update(callback) {
    this.date_set = new Date();
    dbControl.update('schedules', { _id: s.schedule_id }, s.toData(), callback);
}

Schedule.findBySelector = function findBySelector(selector, callback) {
    var s = new Object();
    if (selector.schedule_id != undefined)
        s._id = selector.schedule_id;
    else {
        if (selector.name != undefined)
            s.name = selector.name;
        var sel = new Object();
        var flag = false;
        if (selector.start_date != undefined) {
            sel.$gte = new Date(selector.start_date)
            flag = true;
        }

        if (selector.end_date != undefined) {
            sel.$lte = new Date(selector.end_date)
            flag = true;
        }
        if (flag)
            s.date = sel;
        if (selector.date_set != undefined)
            s.date_set = { $gte: selector.date_set }
    }

    db.findBySelector('schedules', s, function (err, result) {
        var schedules = new Array(result.length);
        for (var i = 0; i < schedules.length; i++)
            schedules[i] = new Schedule(result[i]);
        callback(err, schedules);
    });
}

