var chalk = require('chalk');
var pgp = require('pg-promise')();
var db = pgp({
    host: '192.168.1.11',
    port: 5432,
    database: 'techmasterv3',
    user: 'postgres',
    password: '123456'
});
var Task = require('./task/trainer_course')(db);

Task.then(function () {
    // process.exit(0);
}).catch(function (err) {
    console.error(chalk.bold.red(err));
    process.exit(1);
})