import { Config } from '@framework';
import { IsNotEmpty, IsString } from 'class-validator';

export class RecorderConfig extends Config {
  @IsNotEmpty()
  @IsString()
  public recordTemp!: string;

  @IsNotEmpty()
  @IsString()
  public recordPath!: string;

  @IsNotEmpty()
  @IsString()
  public ffmpegPath!: string;

  public getName(): string {
    return 'record';
  }
}
