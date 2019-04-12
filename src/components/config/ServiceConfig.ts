import { Config } from '@framework';
import { IsNotEmpty, IsString } from 'class-validator';

export class ServiceConfig extends Config {
  @IsNotEmpty()
  @IsString()
  public coreApi!: string;

  public getName(): string {
    return 'services';
  }
}
