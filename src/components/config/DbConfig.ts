import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Config } from '@framework';

export class DbConfig extends Config {
  public type!: 'postgres';

  @IsNotEmpty()
  public host!: string;

  @IsNotEmpty()
  @IsString()
  public database!: string;

  @IsNotEmpty()
  @IsString()
  public username!: string;

  @IsNotEmpty()
  @IsString()
  public password!: string;

  @IsOptional()
  public cli!: Object;

  public getName(): string {
    return 'db';
  }

  public getDefaults(): Object {
    return {
      type: 'postgres',
      logging: 'all',
      cli: {
        migrationsDir: 'src/migrations'
      }
    };
  }
}
