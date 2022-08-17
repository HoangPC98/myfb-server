import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1660758753757 implements MigrationInterface {
  name = 'InitDB1660758753757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`login_sessions\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`user_id\` int NOT NULL, \`uuid\` varchar(255) NOT NULL, \`fcm_token\` varchar(255) NULL, PRIMARY KEY (\`user_id\`, \`uuid\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notifications\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`entity_id\` bigint NULL, \`entity_type\` enum ('FriendShip', 'Post', 'Reaction', 'Comment') NULL, \`notify_type\` enum ('Add Friend Request', 'Accept Add Frinend Request', 'Has Comment', 'Has React') NULL, \`data\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification_receives\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`notification_id\` int NOT NULL, \`user_id\` int NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`is_seen\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`notification_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`photos\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`post_id\` int NOT NULL, \`photo_type\` enum ('avatar', 'cover', 'post') NULL, \`photo_url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`privacy\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`user_id\` int NOT NULL, \`view_post\` enum ('public', 'friend', 'private') NULL DEFAULT 'public', \`comment_post\` enum ('public', 'friend', 'private') NULL DEFAULT 'public', \`share_post\` enum ('public', 'friend', 'private') NULL DEFAULT 'public', PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`posts\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`owner_id\` int NOT NULL, \`privacy_mode\` enum ('public', 'friend', 'private') NULL, \`text\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profiles\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`user_id\` int NOT NULL, \`bio\` varchar(255) NOT NULL, \`dob\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`come_from\` varchar(255) NOT NULL, \`work_place\` varchar(255) NOT NULL, \`relationship_status\` enum ('single', 'dating', 'married') NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5b49bd22c967ce2829ca8f1772\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('active', 'inactive', 'locked') NULL DEFAULT 'active', \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`given_name\` varchar(255) NOT NULL, \`gender\` enum ('male', 'female', 'other') NULL, \`avatar_url\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`profileUserId\` int NULL, \`privacyUserId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_7da77968af7f79a98e4b28bb9d\` (\`profileUserId\`), UNIQUE INDEX \`REL_505172424dcd411ba576478d4e\` (\`privacyUserId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`subject_id\` bigint NOT NULL, \`user_id\` int NOT NULL, \`text\` varchar(255) NOT NULL, PRIMARY KEY (\`subject_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`friend_ships\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`sender_uid\` int NOT NULL, \`receiver_uid\` int NOT NULL, \`status\` enum ('pending', 'beFriended', 'blocked', 'rejectFriend') NULL DEFAULT 'pending', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reactions\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`entity_id\` int NOT NULL, \`reactor_id\` int NOT NULL, \`reaction_type\` enum ('like', 'love', 'haha', 'Sad', 'Angry') NULL DEFAULT 'like', PRIMARY KEY (\`entity_id\`, \`reactor_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_sessions\` ADD CONSTRAINT \`FK_b5edc6cc3a246a811005a96e06a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_receives\` ADD CONSTRAINT \`FK_e8ae020e082ed87fe1a491edaaf\` FOREIGN KEY (\`notification_id\`) REFERENCES \`notifications\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_receives\` ADD CONSTRAINT \`FK_8b763e10d128342b7f1dab8c470\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` ADD CONSTRAINT \`FK_2fa80079f16f9dcd1f89d046e1c\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_b1af88132324949129771c184af\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE \`friend_ships\` ADD CONSTRAINT \`FK_2177f67bfd83bc3aa61ce425b3f\` FOREIGN KEY (\`sender_uid\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`friend_ships\` ADD CONSTRAINT \`FK_4a7d969a03352743c304e997d04\` FOREIGN KEY (\`receiver_uid\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reactions\` ADD CONSTRAINT \`FK_939f3a8fd1ad8afd3615f3c71ac\` FOREIGN KEY (\`reactor_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reactions\` DROP FOREIGN KEY \`FK_939f3a8fd1ad8afd3615f3c71ac\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`friend_ships\` DROP FOREIGN KEY \`FK_4a7d969a03352743c304e997d04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`friend_ships\` DROP FOREIGN KEY \`FK_2177f67bfd83bc3aa61ce425b3f\``,
    );
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
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_b1af88132324949129771c184af\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` DROP FOREIGN KEY \`FK_2fa80079f16f9dcd1f89d046e1c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_receives\` DROP FOREIGN KEY \`FK_8b763e10d128342b7f1dab8c470\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_receives\` DROP FOREIGN KEY \`FK_e8ae020e082ed87fe1a491edaaf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_sessions\` DROP FOREIGN KEY \`FK_b5edc6cc3a246a811005a96e06a\``,
    );
    await queryRunner.query(`DROP TABLE \`reactions\``);
    await queryRunner.query(`DROP TABLE \`friend_ships\``);
    await queryRunner.query(`DROP TABLE \`comments\``);
    await queryRunner.query(
      `DROP INDEX \`REL_505172424dcd411ba576478d4e\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_7da77968af7f79a98e4b28bb9d\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5b49bd22c967ce2829ca8f1772\` ON \`profiles\``,
    );
    await queryRunner.query(`DROP TABLE \`profiles\``);
    await queryRunner.query(`DROP TABLE \`posts\``);
    await queryRunner.query(`DROP TABLE \`privacy\``);
    await queryRunner.query(`DROP TABLE \`photos\``);
    await queryRunner.query(`DROP TABLE \`notification_receives\``);
    await queryRunner.query(`DROP TABLE \`notifications\``);
    await queryRunner.query(`DROP TABLE \`login_sessions\``);
  }
}
