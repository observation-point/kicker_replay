import { Config } from '@framework';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class StreamConfig extends Config {
  @IsNotEmpty()
  @IsString()
  public tempDir!: string;

  @IsNotEmpty()
  @IsString()
  public ffmpegPath!: string;

  @IsNotEmpty()
  @IsString()
  public streamUrl!: string;

  @IsNotEmpty()
  @IsString()
  public rtspTransport!: string;

  @IsNotEmpty()
  @IsBoolean()
  public checkStream!: boolean;

  public getName(): string {
    return 'stream';
  }
}
