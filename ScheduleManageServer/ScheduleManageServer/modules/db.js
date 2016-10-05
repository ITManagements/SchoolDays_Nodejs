﻿var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db,
    new Server(settings.dbhost, settings.dbport, {}), { safe: true });