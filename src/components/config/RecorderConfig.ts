import { Config } from '@framework';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class RecorderConfig extends Config {
  @IsNotEmpty()
  @IsString()
  public ffmpegPath!: string;
  
  @IsNotEmpty()
  @IsString()
  public ffprobePath!: string;

  @IsNotEmpty()
  @IsString()
  public streamDir!: string;

  @IsNotEmpty()
  @IsString()
  public replaysDir!: string;

  @IsNotEmpty()
  @IsString()
  public streamUrl!: string;

  @IsNotEmpty()
  @IsString()
  public replayUrl!: string;

  @IsNotEmpty()
  @IsString()
  public rtspTransport!: string;

  @IsNotEmpty()
  @IsBoolean()
  public checkStream!: true;

  @IsNotEmpty()
  @IsNumber()
  public streamDuration!: 10;

  @IsNotEmpty()
  @IsNumber()
  public fragmentDuration!: 2;

  @IsNotEmpty()
  @IsNumber()
  public replayDuration!: 5;

  public getName(): string {
    return 'recorder';
  }
}
