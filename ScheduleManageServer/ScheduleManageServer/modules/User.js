var db = require('./dbControl');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.nick_name = user.nick_name;
};

module.exports = User;

User.prototype.toJSON = function save(callback) {
    var user = {
        naem: this.name,
        password: this.password,
        nick_name: this.nick_name
    };
    return user
}

User.prototype.save = function save(callback) {
    db.insert('users', 'name', this.toJSON(), callback);
}

User.get = function (username, callback) {
    db.get('users', { name: username }, function (err, result) {
        if (result) {
            var newUser = new User(result);
            callback(err, result);
        }
        else {
            callback(err, null);
        }
    });
}

User.prototype.update = function update(callback) {
    dbControl.update('users', { name: this.name }, this.toJSON(), callback);
}
