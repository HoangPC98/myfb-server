import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyEntityType1660761099891 implements MigrationInterface {
  name = 'ModifyEntityType1660761099891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`entity_id\` int NOT NULL, \`user_id\` int NOT NULL, \`entity_type\` enum ('FriendShip', 'Post', 'Reaction', 'Comment') NOT NULL, \`text\` varchar(255) NOT NULL, PRIMARY KEY (\`entity_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reactions\` ADD \`entity_type\` enum ('FriendShip', 'Post', 'Reaction', 'Comment') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_sessions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_sessions\` CHANGE \`fcm_token\` \`fcm_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`entity_id\` \`entity_id\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`entity_type\` \`entity_type\` enum ('FriendShip', 'Post', 'Reaction', 'Comment') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`notify_type\` \`notify_type\` enum ('Add Friend Request', 'Accept Add Frinend Request', 'Has Comment', 'Has React') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_receives\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` CHANGE \`photo_type\` \`photo_type\` enum ('avatar', 'cover', 'post') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`privacy\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`privacy_mode\` \`privacy_mode\` enum ('public', 'friend', 'private') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` CHANGE \`relationship_status\` \`relationship_status\` enum ('single', 'dating', 'married') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7da77968af7f79a98e4b28bb9d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_505172424dcd411ba576478d4e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`profileUserId\` \`profileUserId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`privacyUserId\` \`privacyUserId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`friend_ships\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reactions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7da77968af7f79a98e4b28bb9d4\` FOREIGN KEY (\`profileUserId\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_505172424dcd411ba576478d4e1\` FOREIGN KEY (\`privacyUserId\`) REFERENCES \`privacy\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_505172424dcd411ba576478d4e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7da77968af7f79a98e4b28bb9d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reactions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`friend_ships\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`privacyUserId\` \`privacyUserId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`profileUserId\` \`profileUserId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_505172424dcd411ba576478d4e1\` FOREIGN KEY (\`privacyUserId\`) REFERENCES \`privacy\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7da77968af7f79a98e4b28bb9d4\` FOREIGN KEY (\`profileUserId\`) REFERENCES \`profiles\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` CHANGE \`relationship_status\` \`relationship_status\` enum ('single', 'dating', 'married') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`privacy_mode\` \`privacy_mode\` enum ('public', 'friend', 'private') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`privacy\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` CHANGE \`photo_type\` \`photo_type\` enum ('avatar', 'cover', 'post') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_receives\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`notify_type\` \`notify_type\` enum ('Add Friend Request', 'Accept Add Frinend Request', 'Has Comment', 'Has React') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`entity_type\` \`entity_type\` enum ('FriendShip', 'Post', 'Reaction', 'Comment') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`entity_id\` \`entity_id\` bigint NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notifications\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_sessions\` CHANGE \`fcm_token\` \`fcm_token\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_sessions\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reactions\` DROP COLUMN \`entity_type\``,
    );
    await queryRunner.query(`DROP TABLE \`comments\``);
  }
}
