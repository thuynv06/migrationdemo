/**
 * Created by chotoxautinh on 12/13/16.
 */
module.exports = {
    addNewColumn: `ALTER TABLE $1^ ADD COLUMN IF NOT EXISTS $2^ $3^ $4^ `,
    setNotNullColumn: `ALTER TABLE $1^ ALTER COLUMN $2^ SET NOT NULL;`,
    changeTypeColumn:`ALTER TABLE $1^ ALTER COLUMN $2^ S3^`,
    insertTrainerCourse: `insert into $1^ (course_id,trainer_id) values ($2^,$3^);`
}