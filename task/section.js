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
        tasks.push(schemaAction.duplicateTable('puclic.section','training.section'));

        tasks.push(tableAction.addNewColumn(t,'training.section','new_id','bigint','not null','default training.id_generator()'));


        return t.back(tasks);
    });

}