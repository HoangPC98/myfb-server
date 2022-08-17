import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitDB1660714707871 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
