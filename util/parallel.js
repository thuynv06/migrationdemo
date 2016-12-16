/**
 * Created by chotoxautinh on 12/13/16.
 */
var Promise = require('bluebird');
var path = require('path');

module.exports = function (db) {
    return function (...values) {
        let tasks = values.map(function (value) {
            if (Promise.resolve(value) == value)
                return value;
            let task = require(path.join('..', 'task/' + value))(db);
            return task;
        });
        return Promise.all(tasks);
    }
}