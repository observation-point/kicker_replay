import { createConnection, Connection } from 'typeorm';
import { DbConfig } from '@config';
import { TypeormLogger } from './TypeormLogger';

export class DbConnectionFactory {
  protected dbConfig: DbConfig;

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig;
  }

  public async create(options: { migrations: string; models: string; }): Promise<Connection> {
    return createConnection({
      logger: new TypeormLogger(),
      ...this.getConfig(options),
    });
  }

  public getConfig(options: { migrations: string; models: string; }) {
    return {
      ...this.dbConfig,
      migrations: [options.migrations],
      entities: [options.models]
    };
  }

}
