import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyRelationPostCommentReaction1660769214496 implements MigrationInterface {
    name = 'ModifyRelationPostCommentReaction1660769214496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`photo_type\` \`photo_type\` enum ('avatar', 'cover', 'post') NULL`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`fcm_token\` \`fcm_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`entity_id\` \`entity_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`entity_type\` \`entity_type\` enum ('friend_ships', 'posts', 'reactions', 'photos', 'comments') NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`notify_type\` \`notify_type\` enum ('add friend request', 'accept frinend Request', 'has comment', 'has react') NULL`);
        await queryRunner.query(`ALTER TABLE \`notification_receives\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`relationship_status\` \`relationship_status\` enum ('single', 'dating', 'married') NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7da77968af7f79a98e4b28bb9d4\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_505172424dcd411ba576478d4e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profileUserId\` \`profileUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`privacyUserId\` \`privacyUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`privacy\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`reactions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`privacy_mode\` \`privacy_mode\` enum ('public', 'friend', 'private') NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`friend_ships\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7da77968af7f79a98e4b28bb9d4\` FOREIGN KEY (\`profileUserId\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_505172424dcd411ba576478d4e1\` FOREIGN KEY (\`privacyUserId\`) REFERENCES \`privacy\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_c25e4142f9fce71c60d09aeb1fb\` FOREIGN KEY (\`entity_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_27b6725d03ab49cab126157e999\` FOREIGN KEY (\`entity_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_27b6725d03ab49cab126157e999\``);
        await queryRunner.query(`ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_c25e4142f9fce71c60d09aeb1fb\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_505172424dcd411ba576478d4e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7da77968af7f79a98e4b28bb9d4\``);
        await queryRunner.query(`ALTER TABLE \`friend_ships\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`privacy_mode\` \`privacy_mode\` enum ('public', 'friend', 'private') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`reactions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`privacy\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`privacyUserId\` \`privacyUserId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profileUserId\` \`profileUserId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_505172424dcd411ba576478d4e1\` FOREIGN KEY (\`privacyUserId\`) REFERENCES \`privacy\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7da77968af7f79a98e4b28bb9d4\` FOREIGN KEY (\`profileUserId\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`relationship_status\` \`relationship_status\` enum ('single', 'dating', 'married') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notification_receives\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`notify_type\` \`notify_type\` enum ('add friend request', 'accept frinend Request', 'has comment', 'has react') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`entity_type\` \`entity_type\` enum ('friend_ships', 'posts', 'reactions', 'photos', 'comments') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`entity_id\` \`entity_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`fcm_token\` \`fcm_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`login_sessions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`photo_type\` \`photo_type\` enum ('avatar', 'cover', 'post') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`photos\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
    }

}
