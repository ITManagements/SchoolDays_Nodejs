var db = require('./dbControl');

function MyCookie(myCookie) {
    this.name = myCookie.name;
    this.cookieid = myCookie.name;
    this.setData = myCookie.setData;
};
module.exports = MyCookie;

MyCookie.toData = function () {
    var result = {
        name: this.name,
        cookieid = this.cookieid,
        setData = this.setData
    };
};

MyCookie.setCookie = function(name, callback) {
    
}

MyCookie.getCookie = function (cookieid, callback) {
    db.get('myCookie', { cookieid: cookieid }, function (err, result) {
        if (err)
            callback(err);
        else {
            var d = new Data();
            if (d < result.setData)
            {
                callback(err, result(new MyCookie(result)));
                db.remove('myCookie', { cookieid: cookieid }, function (err) {
                    
                });
            }
            else
                callbakc(err, null);
        }
    });
}
