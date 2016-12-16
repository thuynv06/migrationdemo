/**
 * Created by chotoxautinh on 12/13/16.
 */
module.exports = {
    /**
     * $1: schema_name
     * $2: schema_id
     */
    createFlakeIdGenerator: `create schema if not exists $1^;
            DO
            $do$
            DECLARE
               _kind "char";
            BEGIN
               SELECT INTO _kind  c.relkind
               FROM   pg_class     c
               JOIN   pg_namespace n ON n.oid = c.relnamespace
               WHERE  c.relname = 'global_id_sequence'      -- sequence name here
               AND    n.nspname = '$1^';  -- schema name here
            
               IF NOT FOUND THEN       -- name is free
                  CREATE SEQUENCE $1^.global_id_sequence;
               ELSIF _kind = 'S' THEN  -- sequence exists
                  -- do nothing?
               ELSE                    -- conflicting object of different type exists
                  -- do somethng!
               END IF;
            END
            $do$;
            
            CREATE OR REPLACE FUNCTION $1^.id_generator(OUT result bigint) AS $$
            DECLARE
                our_epoch bigint := 1314220021721;
                seq_id bigint;
                now_millis bigint;
                -- the id of this DB shard, must be set for each
                -- schema shard you have - you could pass this as a parameter too
                shard_id int := $2;
            BEGIN
                SELECT nextval('$1^.global_id_sequence') % 1024 INTO seq_id;
          
                SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
                result := (now_millis - our_epoch) << 23;
                result := result | (shard_id << 10);
                result := result | (seq_id);
            END;
            $$ LANGUAGE PLPGSQL;`,

    /**
     * $1: old_table
     * $2: new_table
     * $3: condition
     */
    duplicateTable: `
            DO
            $do$
            DECLARE v_exists INTEGER;
            
            BEGIN
                SELECT INTO v_exists to_regclass('$2^');
                IF v_exists IS NULL THEN
                    CREATE TABLE $2^ (LIKE $1^ INCLUDING ALL);
                    INSERT INTO $2^ SELECT * FROM $1^ WHERE $3^;
                END IF;
            END
            $do$;`,

    /**
     * $1: enum_name
     * $2: values
     */
    createTableTrainerCourse:`
                CREATE TABLE IF NOT EXISTS $1^
                (
                  id int,
                  course_id int NOT NULL,
                  trainer_id int NOT NULL ,
                  credit_rate integer NOT NULL DEFAULT 1,
                  join_date date
                )`,
    createEnum: `
            DO
            $do$
            DECLARE v_exists BOOLEAN;
            
            BEGIN
                select INTO v_exists exists (SELECT *
                    FROM        pg_type t 
                    LEFT JOIN   pg_catalog.pg_namespace n ON n.oid = t.typnamespace 
                    WHERE       (t.typrelid = 0 OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid)) 
                    AND     NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)
                    AND     n.nspname NOT IN ('pg_catalog', 'information_schema') AND n.nspname || '.' || t.typname = '$1^');
                IF v_exists = false THEN
                    CREATE TYPE $1^ AS ENUM ($2^);
                END IF;
            END
            $do$;`

}