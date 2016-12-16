/**
 * Created by chotoxautinh on 12/13/16.
 */
const script = require('../script/schema');
const pgp = require('pg-promise')();
var chalk = require('chalk');

exports.createFlakeIdGenerator = function (db, schema_name, schema_id) {
    return db.query(script.createFlakeIdGenerator, [schema_name, schema_id]).then(function () {
        return console.log(chalk.green('✓'), `Tạo thành công FUNCTION: ${schema_name}.id_generator`);
    })
}
exports.createTableTrainerCourse=function (db,new_table) {
    return  db.query(script.createTableTrainerCourse,[new_table]).then(function () {
        return console.log(chalk.green('✓'), `Tạo bảng ${new_table} thành công` );
    });
}
exports.duplicateTable = function (db, old_table, new_table, condition = '1=1') {
    return db.query(script.duplicateTable, [old_table, new_table, condition]).then(function () {
        return console.log(chalk.green('✓'), `Backup thành công table ${old_table} sang ${new_table}`);
    })
}

exports.createEnum = function (db, enum_name, ...values) {
    var enum_values = values.map(value => pgp.as.text(value)).join();
    return db.query(script.createEnum, [enum_name, enum_values]).then(function () {
        return console.log(chalk.green('✓'), `Tạo enum ${enum_name} thành công`);
    })
}