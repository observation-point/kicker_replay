const path = require('path');
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
  baseUrl: path.resolve(__dirname, './dist'),
  paths: tsConfig.compilerOptions.paths
});

const DbConfig = require('./dist/components/config').DbConfig;
const ConfigFactory = require('@framework').ConfigFactory;
const DbConnectionFactory = require('./dist/components/database/DbConnectionFactory').DbConnectionFactory;

const ormconfig = new DbConnectionFactory(
  new ConfigFactory(
    path.resolve(__dirname, './config'),
    process.env.KICKER_REPLAY_ENV
  ).create(DbConfig)
).getConfig({
  migrations: path.resolve(__dirname, './dist/inf/migrations/*.js'),
  models: path.resolve(__dirname, './dist/inf/models/*.js')
});

module.exports = ormconfig;