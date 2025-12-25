import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoreSchema1766656370263 implements MigrationInterface {
    name = 'AddCoreSchema1766656370263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`plan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(2048) NOT NULL, \`duration_weeks\` int NOT NULL, \`diff\` varchar(255) NOT NULL, \`is_public\` tinyint NOT NULL DEFAULT 0, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plan_workout\` (\`id\` int NOT NULL AUTO_INCREMENT, \`week_number\` int NOT NULL, \`day_of_week\` int NOT NULL, \`order_in_day\` int NULL, \`custom_name\` varchar(255) NULL, \`notes\` text NULL, \`workout_id\` int NOT NULL, \`plan_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plan_workout_exercise_set_override\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plan_workout_id\` int NOT NULL, \`workout_exercise_set_id\` int NOT NULL, \`field\` varchar(255) NOT NULL, \`new_value\` varchar(255) NOT NULL, \`notes\` text NULL, INDEX \`IDX_3c8271e8e551601fe9e86e2c3d\` (\`workout_exercise_set_id\`), INDEX \`IDX_f2702fadc274e6c8530ee9982d\` (\`plan_workout_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout_exercise_set\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order\` int NOT NULL, \`reps\` int NULL, \`time\` int NULL, \`weight\` int NULL, \`rest_after\` int NULL, \`notes\` text NULL, \`workout_exercise_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout_exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order\` int NOT NULL, \`exercise_id\` int NOT NULL, \`workout_id\` int NOT NULL, \`rest\` int NULL, \`notes\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(2048) NOT NULL, \`diff\` varchar(255) NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(2048) NOT NULL, \`diff\` varchar(255) NOT NULL, \`is_public\` tinyint NOT NULL DEFAULT 0, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD CONSTRAINT \`FK_4abedc01b0c0c400accca270efa\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` ADD CONSTRAINT \`FK_fa674f69afec2cedb26a5d20f9e\` FOREIGN KEY (\`workout_id\`) REFERENCES \`workout\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` ADD CONSTRAINT \`FK_614784b0f5598a66d4ab7d16995\` FOREIGN KEY (\`plan_id\`) REFERENCES \`plan\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` ADD CONSTRAINT \`FK_f2702fadc274e6c8530ee9982d8\` FOREIGN KEY (\`plan_workout_id\`) REFERENCES \`plan_workout\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` ADD CONSTRAINT \`FK_3c8271e8e551601fe9e86e2c3da\` FOREIGN KEY (\`workout_exercise_set_id\`) REFERENCES \`workout_exercise_set\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workout_exercise_set\` ADD CONSTRAINT \`FK_e0893493535a0c836683b78f74e\` FOREIGN KEY (\`workout_exercise_id\`) REFERENCES \`workout_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workout_exercise\` ADD CONSTRAINT \`FK_8ccd7bc9d29d2ddb137a57ff69c\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercise\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workout_exercise\` ADD CONSTRAINT \`FK_492cbfa1ca305202461669b8021\` FOREIGN KEY (\`workout_id\`) REFERENCES \`workout\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exercise\` ADD CONSTRAINT \`FK_977a54be5b15644bf5dc22093d5\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workout\` ADD CONSTRAINT \`FK_cae9fbd1831b588ad5f76bcf285\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workout\` DROP FOREIGN KEY \`FK_cae9fbd1831b588ad5f76bcf285\``);
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP FOREIGN KEY \`FK_977a54be5b15644bf5dc22093d5\``);
        await queryRunner.query(`ALTER TABLE \`workout_exercise\` DROP FOREIGN KEY \`FK_492cbfa1ca305202461669b8021\``);
        await queryRunner.query(`ALTER TABLE \`workout_exercise\` DROP FOREIGN KEY \`FK_8ccd7bc9d29d2ddb137a57ff69c\``);
        await queryRunner.query(`ALTER TABLE \`workout_exercise_set\` DROP FOREIGN KEY \`FK_e0893493535a0c836683b78f74e\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` DROP FOREIGN KEY \`FK_3c8271e8e551601fe9e86e2c3da\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` DROP FOREIGN KEY \`FK_f2702fadc274e6c8530ee9982d8\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` DROP FOREIGN KEY \`FK_614784b0f5598a66d4ab7d16995\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` DROP FOREIGN KEY \`FK_fa674f69afec2cedb26a5d20f9e\``);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP FOREIGN KEY \`FK_4abedc01b0c0c400accca270efa\``);
        await queryRunner.query(`DROP TABLE \`workout\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`exercise\``);
        await queryRunner.query(`DROP TABLE \`workout_exercise\``);
        await queryRunner.query(`DROP TABLE \`workout_exercise_set\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2702fadc274e6c8530ee9982d\` ON \`plan_workout_exercise_set_override\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c8271e8e551601fe9e86e2c3d\` ON \`plan_workout_exercise_set_override\``);
        await queryRunner.query(`DROP TABLE \`plan_workout_exercise_set_override\``);
        await queryRunner.query(`DROP TABLE \`plan_workout\``);
        await queryRunner.query(`DROP TABLE \`plan\``);
    }

}
