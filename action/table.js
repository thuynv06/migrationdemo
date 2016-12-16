/**
 * Created by chotoxautinh on 12/13/16.
 */
const script = require('../script/table');
var chalk = require('chalk');
const Promise=require('promise');
exports.addNewColumn = function (db, table_name, column_name, data_type, ...column_constraint) {
    let constraint = column_constraint.join(' ');
    return db.query(script.addNewColumn, [table_name, column_name, data_type, constraint]).then(function () {
        return console.log(chalk.green('✓'), `Thêm cột mới thành công : ${table_name}.${column_name}`);
    })
}
exports.changeTypeColumn=function (db,table_name,column_name,new_data_type, ...column_constraint) {
    let constraint = column_constraint.join(' ');
    return db.query(script.changeTypeColumn, [table_name, column_name, new_data_type, constraint]).then(function () {
        return console.log(chalk.green('✓'), `Thay đổi kiểu dữ liệu cột thành c : ${table_name}.${new_data_type}`);
    })

}

exports.setNotNullColumn = function (db, table_name, column_name) {
    return db.query(script.setNotNullColumn, [table_name, column_name]).then(function () {
        return console.log(chalk.green('✓'), `Trường ${table_name}.${column_name} đã được set thành NOT NULL`);
    })
}
exports.insertTrainer_Course=function (db,table_name,course_id,trainer_id) {
    // return db.query(script.insertTrainerCourse,[course_id,trainer_id]).then(function () {
    //     return console.log(chalk.green('✓'), `Insert ${trainer_id},${course_id} thành công`);
    // })
    return promise= new Promise(function (resolve,reject) {
        console.log(script.insertTrainerCourse,[table_name,course_id,trainer_id]);
        resolve(db.query(script.insertTrainerCourse,[table_name,course_id, trainer_id]) + console.log(chalk.green('✓'), `Insert ${trainer_id},${course_id} thành công`));
    })
}