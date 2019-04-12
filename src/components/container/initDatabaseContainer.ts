import { resolve } from 'path';
import { Connection } from 'typeorm';
import { Container } from 'inversify';
import { DbConfig } from '@config';
import { getConfigFacotry } from '@framework';

import { Type } from '../Type';
import { DbConnectionFactory } from '../database/DbConnectionFactory';

import { ImageRepository } from '../../inf/video/RecordRepository';

export const DbType = {
  ImageRepository: Symbol('ImageRepository')
};

export async function initDatabaseContainer(container: Container, options: { baseDir: string; }): Promise<void> {
  const configFacotry = getConfigFacotry(container);

  container.bind<Connection>(Type.DbConnection)
    .toConstantValue(await (new DbConnectionFactory(configFacotry.create(DbConfig))).create({
      models: resolve(options.baseDir, 'inf/**/*.js'),
      migrations: resolve(options.baseDir, 'inf/migrations/*.js'),
    }));
    
  container.bind<ImageRepository>(DbType.ImageRepository)
    .toConstantValue(new ImageRepository());

}
