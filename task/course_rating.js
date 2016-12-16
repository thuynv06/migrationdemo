/**
 * Created by hades on 14/12/2016.
 */
var chalk=require('chalk');
var schemaAction=require('../action/schema');
var tableAction=require('../action/table');

module.exports=function (db) {
    return db.tx(function (t) {
        var tasks=[];
        tasks.push(schemaAction.createFlakeIdGenerator(t,'training',1));
        tasks.push(schemaAction.duplicateTable(t,'public.course_rating','training.course_rating'));
        tasks.push(tableAction.addNewColumn(t,'training.course_rating','new_id','bigint','NOT NULL','DEFAULT training.id_generator()'));


        tasks.push(tableAction.addNewColumn(t,'training.course_rating','new_course_id','bigint','NOT NULL','DEFAULT training.id_generator()'));
        tasks.push(tableAction.addNewColumn(t,'training.course_rating','new_student_id','bigint','NOT NULL','DEFAULT training.id_generator()'));



        return t.batch(tasks);
    });
}
// function fillDataInTypeColumn(db) {
//
//     // Bổ sung giá trị cho cột new_type, nếu cột type = 1 thì giá trị là offline, type 2 thì giá trị là online
//     let insert_query = `UPDATE training.course SET new_type = (CASE WHEN type=1 THEN 'offline'::training.course_type WHEN type=2 THEN 'online'::training.course_type END);`;
//
//     return db.query(insert_query).then(function () {
//         return console.log(chalk.green("✓"), "Điền dữ liệu thành công");
//     });
// }