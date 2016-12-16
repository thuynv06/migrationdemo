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
        tasks.push(schemaAction.duplicateTable(t,'public.quiz','training.quiz'));
        tasks.push(tableAction.addNewColumn(t,'training.quiz','new_id','bigint','NOT NULL','DEFAULT training.id_generator()'));

        tasks.push(tableAction.addNewColumn(t,'training.quiz','author_id','bigint','NOT NULL','DEFAULT training.id_generator()'));
        tasks.push(tableAction.addNewColumn(t,'training.quiz','category_id','bigint','NOT NULL','DEFAULT training.id_generator()'));

        tasks.push(schemaAction.createEnum(t, 'training.quiz_type', 'Single Choice', 'Multiple Choice'));
        tasks.push(tableAction.addNewColumn(t, 'training.quiz', 'new_type', 'training.quiz_type'));
        tasks.push(fillDataInTypeColumn(t));
        tasks.push(tableAction.setNotNullColumn(t, 'training.quiz', 'new_type'));


        return t.batch(tasks);
    });
}
function fillDataInTypeColumn(db) {

    // Bổ sung giá trị cho cột new_type, nếu cột type = 1 thì giá trị là offline, type 2 thì giá trị là online
    let insert_query = `UPDATE training.quiz SET new_type = (CASE WHEN type=1 THEN 'Multiple Choice'::training.quiz_type WHEN type=0 THEN 'Single Choice'::training.quiz_type END);`;

    return db.query(insert_query).then(function () {
        return console.log(chalk.green("✓"), "Điền dữ liệu thành công");
    });
}
