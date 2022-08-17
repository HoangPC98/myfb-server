import config from '../config/configuration';

const typeormConfig = Object.assign(
  {
    migrationsTableName: 'migrations',
    migrations: [__dirname + '/migration/*{.ts,.js}'],
    entities: [__dirname + '/entities/*{.ts,.js}'],
    seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
    factories: [__dirname + '/factories/**/*{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/migration',
      entitiesDir: __dirname + '/entities',
    },
  },
  config().database,
);

module.exports = typeormConfig;
