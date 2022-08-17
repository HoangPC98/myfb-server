import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifySomeType1660761785286 implements MigrationInterface {
    name = 'ModifySomeType1660761785286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`entity_id\` bigint NULL, \`entity_type\` enum ('friend_ships', 'posts', 'reactions', 'photos', 'comments') NULL, \`notify_type\` enum ('add friend request', 'accept frinend Request', 'has comment', 'has react') NULL, \`data\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification_receives\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`notification_id\` int NOT NULL, \`user_id\` int NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`is_seen\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`notification_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`entity_id\` int NOT NULL, \`user_id\` int NOT NULL, \`entity_type\` enum ('friend_ships', 'posts', 'reactions', 'photos', 'comments') NOT NULL, \`text\` varchar(255) NOT NULL, PRIMARY KEY (\`entity_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reactions\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`entity_id\` int NOT NULL, \`reactor_id\` int NOT NULL, \`entity_type\` enum ('friend_ships', 'posts', 'reactions', 'photos', 'comments') NOT NULL, \`reaction_type\` enum ('like', 'love', 'haha', 'sad', 'angry') NULL DEFAULT 'like', PRIMARY KEY (\`entity_id\`, \`reactor_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`fcm_token\` \`fcm_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`photo_type\` \`photo_type\` enum ('avatar', 'cover', 'post') NULL`);
        await queryRunner.query(`ALTER TABLE \`privacy\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`privacy_mode\` \`privacy_mode\` enum ('public', 'friend', 'private') NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`relationship_status\` \`relationship_status\` enum ('single', 'dating', 'married') NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7da77968af7f79a98e4b28bb9d4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_505172424dcd411ba576478d4e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profileUserId\` \`profileUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`privacyUserId\` \`privacyUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`friend_ships\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`notification_receives\` ADD CONSTRAINT \`FK_e8ae020e082ed87fe1a491edaaf\` FOREIGN KEY (\`notification_id\`) REFERENCES \`notifications\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification_receives\` ADD CONSTRAINT \`FK_8b763e10d128342b7f1dab8c470\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7da77968af7f79a98e4b28bb9d4\` FOREIGN KEY (\`profileUserId\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_505172424dcd411ba576478d4e1\` FOREIGN KEY (\`privacyUserId\`) REFERENCES \`privacy\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_939f3a8fd1ad8afd3615f3c71ac\` FOREIGN KEY (\`reactor_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_939f3a8fd1ad8afd3615f3c71ac\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_505172424dcd411ba576478d4e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7da77968af7f79a98e4b28bb9d4\``);
        await queryRunner.query(`ALTER TABLE \`notification_receives\` DROP FOREIGN KEY \`FK_8b763e10d128342b7f1dab8c470\``);
        await queryRunner.query(`ALTER TABLE \`notification_receives\` DROP FOREIGN KEY \`FK_e8ae020e082ed87fe1a491edaaf\``);
        await queryRunner.query(`ALTER TABLE \`friend_ships\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`privacyUserId\` \`privacyUserId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profileUserId\` \`profileUserId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_505172424dcd411ba576478d4e1\` FOREIGN KEY (\`privacyUserId\`) REFERENCES \`privacy\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7da77968af7f79a98e4b28bb9d4\` FOREIGN KEY (\`profileUserId\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`relationship_status\` \`relationship_status\` enum ('single', 'dating', 'married') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`privacy_mode\` \`privacy_mode\` enum ('public', 'friend', 'private') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`privacy\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`photo_type\` \`photo_type\` enum ('avatar', 'cover', 'post') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`fcm_token\` \`fcm_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`reactions\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`notification_receives\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
