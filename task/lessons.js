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
        tasks.push(schemaAction.duplicateTable(t,'public.lessons','training.lessons'));
        tasks.push(tableAction.addNewColumn(t,'training.lessons','new_id','bigint','NOT NULL','DEFAULT training.id_generator()'));

        tasks.push(tableAction.addNewColumn(t,'training.lessons','new_author_id','bigint','DEFAULT training.id_generator()'));
        tasks.push(tableAction.addNewColumn(t,'training.lessons','new_video_id','bigint','NOT NULL','DEFAULT training.id_generator()'));
        tasks.push(tableAction.addNewColumn(t,'training.lessons','new_slide_id','bigint',' NOT NULL','DEFAULT training.id_generator()'));

        tasks.push(schemaAction.createEnum(t, 'training.lessons_type', 'online', 'offline', '11support'));
        tasks.push(tableAction.addNewColumn(t,'training.lessons','type','training.lessons_type'));
        tasks.push(tableAction.addNewColumn(t,'training.lessons','is_offline','boolean','DEFAULT FALSE'));

        return t.batch(tasks);
    });
}