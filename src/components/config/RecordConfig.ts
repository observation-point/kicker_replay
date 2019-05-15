import { Config } from '@framework';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RecordConfig extends Config {
  @IsNotEmpty()
  @IsString()
  public ffmpegPath!: string;
  
  @IsNotEmpty()
  @IsString()
  public ffprobePath!: string;
  
  @IsNotEmpty()
  @IsString()
  public tempDir!: string;

  @IsNotEmpty()
  @IsString()
  public recordsDir!: string;

  @IsNotEmpty()
  @IsString()
  public baseUrl!: string;

  @IsNotEmpty()
  @IsNumber()
  public duration!: number;

  public getName(): string {
    return 'record';
  }
}
