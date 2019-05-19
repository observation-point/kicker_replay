import * as ffmpeg from 'fluent-ffmpeg';
import { RecorderConfig } from '@config';
import { ILogger, di } from '@framework';
import { Type } from '@diType';
import * as fs from 'fs';

class RecordService {
  @di.inject(Type.AppLogger)
  private logger!: ILogger;

  private config: RecorderConfig;
  private cmd!: ffmpeg.FfmpegCommand;

  constructor(config: RecorderConfig) {
    this.config = config;
  }

  public async replay(gameId: string, goalId: string): Promise<string|never> {
    this.cmd = ffmpeg()
      .setFfmpegPath(this.config.ffmpegPath)
      .setFfprobePath(this.config.ffprobePath);

    const subDir = await this.createSubDir(gameId);
    const fragmentList = await this.getListOfStreamFragments();
    const concatList = await this.getListToConcat(fragmentList);

    if (!concatList) {
      throw new Error('А ты стрим записал?');
    }

    this.cmd
      .addInput(`concat:${concatList.join('|')}`)
      .addOption('-c', 'copy');

    return await new Promise((resolve, reject) => {
      this.cmd
        .on('start', (data: any) => this.logger.info(data))
        .on('error', (err: Error) => reject(err.message))
        .on('stderr', (data: any) => this.logger.debug(data))
        .on('end', () => resolve(`${this.config.replayUrl}/${gameId}/${goalId}.mp4`))
        .save(`${subDir}/${goalId}.mp4`);
    });
  }

  private async getListOfStreamFragments(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.config.streamDir, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          reject(err);
        }
        const fragments = [];
        for (const file of files) {
          if (file.includes('.ts')) {
            fragments.push(`${this.config.streamDir}/${file}`);
          }
        }
        resolve(fragments);
      });
    });
  }

  private getListToConcat(list: string[]): string[] {
    let fragmentCount = 0;
    if (this.config.fragmentDuration * list.length < this.config.replayDuration)  {
      fragmentCount = list.length;
    } else {
      fragmentCount = Math.floor(this.config.replayDuration / this.config.fragmentDuration);
    }
    return list.slice(list.length - fragmentCount);
  }

  private async createSubDir(subDir: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const recordsDir = `${this.config.replaysDir}/${subDir}`;
      fs.exists(`${this.config.replaysDir}/${subDir}`, (exist: boolean) => {
        if (exist) {
          resolve(recordsDir);
        } else {
          fs.mkdir(`${this.config.replaysDir}/${subDir}`, (err) => {
            if (err) {
              reject(err);
            }
            resolve(recordsDir);
          });
        }
      });
    });
  }
}

export { RecordService };
