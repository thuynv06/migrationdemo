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
        tasks.push(schemaAction.duplicateTable(t,'public.media','training.media'));
        tasks.push(tableAction.addNewColumn(t,'training.media','new_id','bigint','NOT NULL','DEFAULT training.id_generator()'));


        tasks.push(tableAction.addNewColumn(t,'training.media','new_server_id','bigint','NOT NULL','DEFAULT training.id_generator()'));

        return t.batch(tasks);
    });
}