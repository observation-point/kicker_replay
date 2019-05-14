// tslint:disable:variable-name
import { Config } from '@framework';
import { IsNumber, IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';

class MediaServer extends Config {
  @ValidateNested()
  public rtmp!: RTMPConfig;
  @ValidateNested()
  public http!: HTTPConfig;
  @ValidateNested()
  public trans!: TranscodeConfig;
  public getName(): string {
    return 'media-server';
  }
}

class RTMPConfig {
  @IsNumber()
  public port!: number;
  @IsNumber()
  public chunk_size!: number;
  @IsBoolean()
  public gop_cache!: boolean;
  @IsNumber()
  public ping!: number;
  @IsNumber()
  public ping_timeout!: number;
}

class HTTPConfig {
  @IsNumber()
  public port!: number;
  @IsString()
  public mediaroot!: string;
  @IsString()
  public allow_origin!: string;
}

class TranscodeConfig {
  @IsString()
  public ffmpeg!: string;
  @IsArray()
  public tasks!: any[];
}

export { MediaServer };
