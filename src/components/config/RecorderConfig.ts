import { Config } from '@framework';
import { IsNotEmpty, IsString } from 'class-validator';

export class RecorderConfig extends Config {
  @IsNotEmpty()
  @IsString()
  public recordsTemp!: string;

  @IsNotEmpty()
  @IsString()
  public recordsPath!: string;

  public name: any;
  
  public url: any;
  
  public timeLimit!: number;
  
  public folder!: string;
  
  public type!: string;
  
  public directoryPathFormat!: string;
  
  public fileNameFormat!: string;

  public getName(): string {
    return 'recorder';
  }
}
