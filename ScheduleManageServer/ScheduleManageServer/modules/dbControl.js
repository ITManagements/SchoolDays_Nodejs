var mongodb = require('./db');
var objID = require('mongodb').ObjectID;

function dbControl() { }
module.exports = dbControl;

//插入元组，，第一个参数为表名，第二个参数为主键，当主键为null时不设置主键，第三个参数为新的元组，第四个参数为回调函数
dbControl.insert = function insert(collectionName, keyName, tuple, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err, null);
        }
        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err, null);
            }
            if (keyName != null)
                collection.ensureIndex(keyName, { unique: true });
            collection.insert(tuple, { safe: true }, function (err, result) {
                mongodb.close();
                return callback(err, result);
            });
        });
    });
}

//获取一个元组，第一个参数为表名，第二个参数为选择器，与mongo的选择器相同，第三个参数为回调函数
dbControl.get = function get(collectionName, selector, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err, null);
        }
        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err, null);
            }
            if (selector._id != undefined)
                selector._id = objID(selector._id);
            collection.findOne(selector, function (err, doc) {
                mongodb.close();
                if (doc) {
                    callback(err, doc);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

//更新元组，第一个参数为表名，第二个参数为选择器，与mongo的选择器相同，第三个元素为新的元组，第四个参数为回调函数
dbControl.update = function update(collectionName, selector, tuple, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            if (selector._id != undefined)
                selector._id = objID(selector._id);
            collection.update(selector, tuple, function (err) {
                mongodb.close();
                callback(err);
            });
        });
    });
};

//移除一个元组，第一个参数为表名，第二个参数为选择器，与mongo的选择器相同，第三个参数为回调函数
dbControl.remove = function remove(collectionName, selector, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            if (selector._id != undefined)
                selector._id = objID(selector._id);
            collection.removeOne(selector, function (err) {
                mongodb.close();
                callback(err);
            });
        });
    });
};

//获取表名内的全部元组
dbControl.getAll = function getAll(collectionName, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err, null);
        }
        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err, null);
            }
            collection.find().toArray(function (err, doc) {
                mongodb.close();
                if (doc) {
                    callback(err, doc);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

//查找个元组，第一个参数为表名，第二个参数为选择器，与mongo的选择器相同，第三个参数为回调函数
dbControl.findBySelector = function findBySelector(collectionName, selector, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err, null);
        }
        db.collection(collectionName, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err, null);
            }
            if (selector._id != undefined)
                selector._id = objID(selector._id);
            collection.find(selector).toArray(function (err, doc) {
                mongodb.close();
                if (doc) {
                    callback(err, doc);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};