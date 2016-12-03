var db = require('./dbControl');

function User(user) {
    if (user.name != undefined)
        this.name = user.name;
    else if (user.username != undefined)
        this.name = user.username;
    else
        this.name = null;
    this.password = user.password;
    if (user.nick_name != undefined)
        this.nick_name = user.nick_name;
    else
        this.nick_name = user.nickname;
};

module.exports = User;

User.prototype.toJSON = function toJSON(callback) {
    var user = {
        name: this.username,
        password: this.password,
        nick_name: this.nickname
    };
    return user;
}

User.prototype.toData = function toJSON(callback) {
    var user = {
        username: this.name,
        password: this.password,
        nickname: this.nick_name
    };
    return user;
}

User.prototype.save = function save(callback) {
    db.insert('users', 'username', this.toData(), callback);
}

User.get = function get(username, callback) {
    db.get('users', { username: username }, function (err, result) {
        if (result) {
            var newUser = new User(result);
            callback(err, newUser);
        }
        else {
            callback(err, null);
        }
    });
}

User.prototype.update = function update(callback) {
    dbControl.update('users', { name: this.name }, this.toData(), callback);
}