/**
 * Created by hades on 14/12/2016.
 */
var chalk = require('chalk');
var schemaAction = require('../action/schema');
var tableAction = require('../action/table');

module.exports = function (db) {
    return db.tx(function (t) {
        // `t` and `this` here are the same;
        // creating a sequence of transaction queries:
        var tasks = [];

        tasks.push(schemaAction.createFlakeIdGenerator(t, 'training', 1));
        tasks.push(schemaAction.duplicateTable(t, 'public.course_category', 'training.course_category'));
        tasks.push(tableAction.addNewColumn(t, 'training.course_category', 'new_id', 'bigint', 'NOT NULL', 'DEFAULT training.id_generator()'));



        // returning a promise that determines a successful transaction:
        return t.batch(tasks); // all of the queries are to be resolved;
    });
}