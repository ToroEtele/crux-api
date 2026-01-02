import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoreSchema1767380042595 implements MigrationInterface {
    name = 'AddCoreSchema1767380042595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`avatar_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bytes\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`access_token\` varchar(255) NULL, \`refresh_token\` varchar(255) NULL, \`id_token\` varchar(255) NULL, \`access_token_expires_at\` datetime NULL, \`refresh_token_expires_at\` datetime NULL, \`scope\` varchar(255) NULL, \`password\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`account_id\` varchar(255) NOT NULL, \`provider_id\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`email_verified\` tinyint NOT NULL DEFAULT 0, \`image\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`stripe_customer_id\` varchar(255) NULL, \`ban_expires\` varchar(255) NULL, \`ban_reason\` text NULL, \`banned\` tinyint NOT NULL DEFAULT 0, \`role\` text NULL, \`birth_date\` datetime NULL, \`country\` varchar(255) NULL, \`city\` varchar(255) NULL, \`max_grade_at_registration\` varchar(255) NULL, \`max_grade\` varchar(255) NULL, \`terms_agreed\` tinyint NOT NULL DEFAULT 0, \`avatar_image_id\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_013c0803e80018bfe46fca1a98\` (\`avatar_image_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`expires_at\` datetime NOT NULL, \`token\` varchar(255) NOT NULL, \`ip_address\` varchar(255) NULL, \`user_agent\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`impersonated_by\` text NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_232f8e85d7633bd6ddfad42169\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(2048) NOT NULL, \`duration_weeks\` int NOT NULL, \`diff\` varchar(255) NOT NULL, \`is_public\` tinyint NOT NULL DEFAULT 0, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plan_workout\` (\`id\` int NOT NULL AUTO_INCREMENT, \`week_number\` int NOT NULL, \`day_of_week\` int NOT NULL, \`order_in_day\` int NULL, \`custom_name\` varchar(255) NULL, \`notes\` text NULL, \`workout_id\` int NOT NULL, \`plan_id\` int NOT NULL, UNIQUE INDEX \`UQ_PLAN_WORKOUT_ORDER\` (\`plan_id\`, \`week_number\`, \`day_of_week\`, \`order_in_day\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plan_workout_exercise_set_override\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order\` int NOT NULL, \`reps\` int NULL, \`time\` int NULL, \`weight\` int NULL, \`rest_after\` int NULL, \`notes\` text NULL, \`plan_workout_id\` int NOT NULL, \`workout_exercise_set_id\` int NULL, \`workout_exercise_id\` int NOT NULL, INDEX \`IDX_3c8271e8e551601fe9e86e2c3d\` (\`workout_exercise_set_id\`), INDEX \`IDX_f2702fadc274e6c8530ee9982d\` (\`plan_workout_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout_exercise_set\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order\` int NOT NULL, \`reps\` int NULL, \`time\` int NULL, \`weight\` int NULL, \`rest_after\` int NULL, \`notes\` text NULL, \`workout_exercise_id\` int NOT NULL, UNIQUE INDEX \`UQ_WORKOUT_EXERCISE_SET_ORDER\` (\`workout_exercise_id\`, \`order\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout_exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order\` int NOT NULL, \`rest\` int NULL, \`notes\` text NULL, \`exercise_id\` int NOT NULL, \`workout_id\` int NOT NULL, UNIQUE INDEX \`UQ_WORKOUT_EXERCISE_ORDER\` (\`workout_id\`, \`order\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(2048) NOT NULL, \`diff\` varchar(255) NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(2048) NOT NULL, \`diff\` varchar(255) NOT NULL, \`is_public\` tinyint NOT NULL DEFAULT 0, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plan\` varchar(255) NOT NULL, \`reference_id\` varchar(255) NOT NULL, \`stripe_customer_id\` varchar(255) NULL, \`stripe_subscription_id\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`period_start\` bigint NULL, \`period_end\` bigint NULL, \`cancel_at_period_end\` tinyint NULL, \`seats\` bigint NULL, \`trial_start\` datetime NULL, \`trial_end\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`verification_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`expires_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_efef1e5fdbe318a379c06678c51\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_013c0803e80018bfe46fca1a985\` FOREIGN KEY (\`avatar_image_id\`) REFERENCES \`avatar_image\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_30e98e8746699fb9af235410aff\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan\` ADD CONSTRAINT \`FK_4abedc01b0c0c400accca270efa\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` ADD CONSTRAINT \`FK_fa674f69afec2cedb26a5d20f9e\` FOREIGN KEY (\`workout_id\`) REFERENCES \`workout\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` ADD CONSTRAINT \`FK_614784b0f5598a66d4ab7d16995\` FOREIGN KEY (\`plan_id\`) REFERENCES \`plan\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` ADD CONSTRAINT \`FK_f2702fadc274e6c8530ee9982d8\` FOREIGN KEY (\`plan_workout_id\`) REFERENCES \`plan_workout\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` ADD CONSTRAINT \`FK_3c8271e8e551601fe9e86e2c3da\` FOREIGN KEY (\`workout_exercise_set_id\`) REFERENCES \`workout_exercise_set\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` ADD CONSTRAINT \`FK_fc03f28b2f802f8aa8949ea0621\` FOREIGN KEY (\`workout_exercise_id\`) REFERENCES \`workout_exercise\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` DROP FOREIGN KEY \`FK_fc03f28b2f802f8aa8949ea0621\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` DROP FOREIGN KEY \`FK_3c8271e8e551601fe9e86e2c3da\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout_exercise_set_override\` DROP FOREIGN KEY \`FK_f2702fadc274e6c8530ee9982d8\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` DROP FOREIGN KEY \`FK_614784b0f5598a66d4ab7d16995\``);
        await queryRunner.query(`ALTER TABLE \`plan_workout\` DROP FOREIGN KEY \`FK_fa674f69afec2cedb26a5d20f9e\``);
        await queryRunner.query(`ALTER TABLE \`plan\` DROP FOREIGN KEY \`FK_4abedc01b0c0c400accca270efa\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_30e98e8746699fb9af235410aff\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_013c0803e80018bfe46fca1a985\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_efef1e5fdbe318a379c06678c51\``);
        await queryRunner.query(`DROP TABLE \`verification_token\``);
        await queryRunner.query(`DROP TABLE \`subscription\``);
        await queryRunner.query(`DROP TABLE \`workout\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`exercise\``);
        await queryRunner.query(`DROP INDEX \`UQ_WORKOUT_EXERCISE_ORDER\` ON \`workout_exercise\``);
        await queryRunner.query(`DROP TABLE \`workout_exercise\``);
        await queryRunner.query(`DROP INDEX \`UQ_WORKOUT_EXERCISE_SET_ORDER\` ON \`workout_exercise_set\``);
        await queryRunner.query(`DROP TABLE \`workout_exercise_set\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2702fadc274e6c8530ee9982d\` ON \`plan_workout_exercise_set_override\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c8271e8e551601fe9e86e2c3d\` ON \`plan_workout_exercise_set_override\``);
        await queryRunner.query(`DROP TABLE \`plan_workout_exercise_set_override\``);
        await queryRunner.query(`DROP INDEX \`UQ_PLAN_WORKOUT_ORDER\` ON \`plan_workout\``);
        await queryRunner.query(`DROP TABLE \`plan_workout\``);
        await queryRunner.query(`DROP TABLE \`plan\``);
        await queryRunner.query(`DROP INDEX \`IDX_232f8e85d7633bd6ddfad42169\` ON \`session\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`REL_013c0803e80018bfe46fca1a98\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`avatar_image\``);
    }

}
