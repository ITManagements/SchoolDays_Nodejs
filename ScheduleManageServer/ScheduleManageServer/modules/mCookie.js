var db = require('./dbControl');
var crypto = require('crypto');

function hax_md5(str) {
    var md5 = crypto.createHash('md5');
    md5.update(str);
    str = md5.digest('hex');
    return str;
}

function MyCookie(myCookie) {
    this.name = myCookie.name;
    this.cookieid = myCookie.cookieid;
    this.setDate = myCookie.setDate;
};
module.exports = MyCookie;

MyCookie.prototype.toData = function () {
    var result = {
        name: this.name,
        cookieid: this.cookieid,
        setDate: this.setDate
    };
    return result;
};

MyCookie.setCookie = function (name, callback) {
    var d = new Date();
    var cookie = hax_md5(name + d.toJSON());
    var newCookie = new MyCookie({
        name: name,
        cookieid: cookie,
        setDate: d
    });;
    db.insert('myCookie', 'cookieid', newCookie.toData(), function (err) {
        if (err)
            callback(err);
        else {
            callback(err, newCookie);
        }
    });
}

MyCookie.getCookie = function (cookieid, callback) {
    db.get('myCookie', { cookieid: cookieid }, function (err, result) {
        if (err)
            callback(err);
        else {
            /*
            var d = new Data();
            if (d < result.setData)
            {
                callback(err, result(new MyCookie(result)));
                db.remove('myCookie', { cookieid: cookieid }, function (err) {
                    
                });
            }
            else*/
            if (!result)
                callback(err, null);
            else
                callback(err, new MyCookie(result));
        }
    });
}

/*
MyCookie.getCookie('1a6a08da5997d024917e943c231f5516', function (err, result) {
    console.log(result);
});
*/
/*
MyCookie.setCookie('kidawing', function (err, result) {
    console.log(result);
    //console.log(result);
});
*/