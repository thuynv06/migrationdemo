/**
 * Created by hades on 15/12/2016.
 */
var chalk=require('chalk');
var schemaAction=require('../action/schema');
var tableAction=require('../action/table');

module.exports=function (db) {
    return db.tx(function (t) {
        var tasks=[];
        tasks.push(schemaAction.createFlakeIdGenerator(t,'training',1));
        tasks.push(schemaAction.duplicateTable(t,'public.quiz_answer','training.quiz_answer'));
        tasks.push(tableAction.addNewColumn(t,'training.quiz_answer','new_id','bigint','NOT NULL','DEFAULT training.id_generator()'));

        tasks.push(tableAction.addNewColumn(t,'training.quiz_answer','new_quiz_id','bigint','NOT NULL','DEFAULT training.id_generator()'));
        tasks.push(tableAction.addNewColumn(t,'training.quiz_answer','is_correct','boolean','NOT NULL','default false'));

        return t.batch(tasks);
    });
}
