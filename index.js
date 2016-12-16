var chalk = require('chalk');
var pgp = require('pg-promise')();
var db = pgp({
    host: '192.168.1.60',
    port: 5432,
    database: 'techmasterv3',
    user: 'postgres',
    password: '123456'
});
var runSequence = require('./util/runSequence')(db);
var parallel = require('./util/parallel')(db);

/**
 * @param tasks: Danh sách các task được thực hiện (trùng tên với file trong folder `task`)
 * @description: Thực hiện các task được khai báo. Sử dụng tương tự như Gulp:
 *  1. runSequence: Đồng bộ (nối tiếp nhau)
 *  2. parallel: Bất đồng bộ (chạy song song)
 * @example: parallel('Course', runSequence('Lesson', 'Section', 'SectionLesson))
 */
parallel('trainer_course')
    .then(function () {
        process.exit(0);
    })
    .catch(function (err) {
        console.error(chalk.bold.red(err));
        process.exit(1);
    })