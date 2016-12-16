/**
 * Created by chotoxautinh on 12/13/16.
 */
var chalk = require('chalk');
var schemaAction = require('../action/schema');
var tableAction = require('../action/table');

module.exports = function (db) {
    return db.tx(function (t) {
        // `t` and `this` here are the same;
        // creating a sequence of transaction queries:
        var tasks = [];
        //
        // tasks.push(schemaAction.createFlakeIdGenerator(t, 'training', 1));
        // tasks.push(schemaAction.duplicateTable(t, 'public.course', 'training.course'));
        // tasks.push(tableAction.addNewColumn(t, 'training.course', 'new_id', 'bigint', 'NOT NULL', 'DEFAULT training.id_generator()'));

        /* Thử map dữ liệu type vào cho bảng training.course */
        // tasks.push(tableAction.addNewColumn())
        tasks.push(schemaAction.createEnum(t, 'training.course_type', 'online', 'offline', 'internship', 'mix'));
        tasks.push(tableAction.addNewColumn(t, 'training.course', 'new_type', 'training.course_type'));
        tasks.push(fillDataInTypeColumn(t));
        tasks.push(tableAction.setNotNullColumn(t, 'training.course', 'new_type'));

        // returning a promise that determines a successful transaction:
        return t.batch(tasks); // all of the queries are to be resolved;
    });
}

function fillDataInTypeColumn(db) {

    // Bổ sung giá trị cho cột new_type, nếu cột type = 1 thì giá trị là offline, type 2 thì giá trị là online
    let insert_query = `UPDATE training.course SET new_type = (CASE WHEN type=1 THEN 'offline'::training.course_type WHEN type=2 THEN 'online'::training.course_type END);`;

    return db.query(insert_query).then(function () {
        return console.log(chalk.green("✓"), "Điền dữ liệu thành công");
    });
}

