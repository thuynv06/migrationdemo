/**
 * Created by hades on 14/12/2016.
 */

"use strict";

var chalk=require('chalk');
var schemaAction=require('../action/schema');
var tableAction=require('../action/table');
let Promise = require('bluebird');

module.exports=function (db) {
    return db.tx(function (t) {
        var tasks=[];

        tasks.push(schemaAction.createFlakeIdGenerator(t,'training',1));
        tasks.push(schemaAction.createTableTrainerCourse(t,'training.trainer_course'));
        tasks.push(tableAction.addNewColumn(t,'training.trainer_course','new_id','bigint','NOT NULL','DEFAULT training.id_generator()'));
        //
        //
        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course','course_id','int'));
        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course','trainer_id','int'));
        //
        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course','credit_rate','int','NOT NULL','DEFAULT 1'));
        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course','join_date','date'));
        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course','contribute_order','int'));
        // tasks.push(schemaAction.createEnum(t, 'training.sate_type', 'join', 'withdraw'));
        getInfo(t).then(function (result) {
             // let query='insert into training.trainer_course (course_id,trainer_id) values ($1,$2);';
            // db.many(query,result);
            let query = Promise.map(result, (i) => {
                return new Promise((resolve, reject) => {
                    // console.log(i[0]);
                    resolve(tableAction.insertTrainer_Course(t,i[0],i[1]));
                    // console.log(query);
                })
            })

            Promise.all(query).then((re) => {
                console.log(re);
                console.log("Successfully!");
            }).catch((error) => {
                console.log("Error: ",error);
            });

            // for (var i=0; i<result.length;i++){
            //
            //
            //
            //     // console.log(result[i][0]);
            //     // console.log(result[i][1]);
            //     tasks.push(tableAction.insertTrainer_Course(t,result[i][0],result[i][1]));
            //
            // }
        });


        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course', 'state', 'training.state_type'));
        // tasks.push(tableAction.setNotNullColumn(t, 'training.trainer_course','state'));
        // fillDataColumn(db);
        // tasks.push(tableAction.addNewColumn(t,'training.trainer_course','log','jsonb','not null'));
        // tasks.push(tableAction.changeTypeColumn(t,'training.trainer_course','new_course_id','DEFAULT training.id_generator()'))



        // INSERT INTO public.trainer_course select json_object_keys(info) from course_trainer group by json_object_keys(info);

        return t.batch(tasks);
    });
}
function fillData(db,course_id,trainer_id) {
    let insert_query = 'insert into training.trainer_course (course_id,trainer_id) values ($1,$2);';
    return db.query(insert_query,[course_id,trainer_id]).then(function () {
        return console.log(chalk.green("✓"), "Điền dữ liệu thành công");
    });
}
function getInfo(db) {

    // Bổ sung giá trị cho cột new_type, nếu cột type = 1 thì giá trị là offline, type 2 thì giá trị là online
    let query = 'select course_id,info from public.course_trainer ';

    return db.query(query).then(function (results) {
        // let keys = Object.keys(results[0].info);
        // console.log(results);
        let arr_data=[];
        for (let t in results) {
            // console.log(results[t].course_id);
            let course_id = results[t].course_id;
            // console.log(typeof results[t].info([key[0]]));
            // console.log("rate:"+ results[t]);
            // console.log(JSON.stringify(results[t].info));
            let keys = Object.keys(results[t].info);
            // console.log(keys);

            for(let i = 0; i < keys.length; i++) {
                arr_data.push([course_id,keys[i]]);
                // console.log("zzz", keys[i]);
                // fillData(db,course_id,keys[i]);
            }
        }
        // console.log(JSON.stringify(results[0].info, null));
        // //
        // let keys = Object.keys(results[0].info);
        // console.log(keys);
        // for(let i = 0; i < keys.length; i++) {
        //     console.log("xxx", results[0].info[keys[i]]);
        // }
        // console.log(arr_data);
        return arr_data;
    });
}