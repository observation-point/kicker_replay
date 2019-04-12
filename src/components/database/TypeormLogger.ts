import { Logger } from 'typeorm';
import { ILogger, di } from '@framework';

/**
 * Message formatting code copy-pasted from typeorm/src/logger/FileLogger
 */
export class TypeormLogger implements Logger {
  @di.inject(di.Type.DbLogger)
  protected logger!: ILogger;

  public logQuery(query: string, parameters: any[] | undefined) {
    const sql = query
      + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
    this.logger.info(`[QUERY]: ${sql}`);
  }

  public logQueryError(error: string, query: string, parameters: any[] | undefined) {
    const sql = query
      + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
    this.logger.error(`[FAILED QUERY]: ${sql}`);
    this.logger.error(`[QUERY ERROR]: ${error}`);
  }

  public logQuerySlow(time: number, query: string, parameters?: any[] | undefined) {
    const sql = query
      + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
    this.logger.warn(`[SLOW QUERY: ${time} ms]: ${sql}`);
  }

  public logSchemaBuild(message: string) {
    this.logger.debug(message);
  }

  public logMigration(message: string) {
    this.logger.info(message);
  }

  public log(level: 'log' | 'info' | 'warn', message: any) {
    (this.logger as any)[level](message);
  }

}
