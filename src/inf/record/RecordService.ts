import * as ffmpeg from 'fluent-ffmpeg';
import { RecordConfig } from '@config';
import { ILogger, di } from '@framework';
import { Type } from '@diType';
import * as fs from 'fs';
// import { check } from 'diskusage';

class RecordService {
  @di.inject(Type.AppLogger)
  private logger!: ILogger;

  private config: RecordConfig;
  private cmd!: ffmpeg.FfmpegCommand;

  constructor(config: RecordConfig) {
    this.config = config;
  }

  public async replay(gameId: string, goalId: string): Promise<string|never> {
    this.cmd = ffmpeg()
      .setFfmpegPath(this.config.ffmpegPath)
      .setFfprobePath(this.config.ffprobePath);
    const subDir = await this.createSubDir(gameId);
    // const streamFile = await this.getStreamFile(gameId);
    const fragmentList = await this.getFragmentList(gameId);
    // fragmentList.forEach(fragment => this.cmd.addInput(fragment));

    if (!fragmentList) {
      throw new Error('А ты стрим записал?');
    }

    this.cmd
      .addInput(`concat:${fragmentList.join('|')}`)
      // .addInput(streamFile)
      .addInputOption('-ss 00:00:10')
      // .addInputOption('-f concat')
      // .addInputOption('-safe 0')
      .addOption(`-t ${this.config.duration}`)
      .addOption('-c', 'copy');
      // .addOption('-movflags', 'frag_keyframe+empty_moov+faststart');
      // .toFormat('mp4');

    return await new Promise((resolve, reject) => {
      this.cmd
        .on('start', (data: any) => this.logger.info(data))
        .on('error', (err: Error) => reject(err.message))
        .on('stderr', (data: any) => this.logger.debug(data))
        .on('end', () => resolve(`${this.config.baseUrl}/${gameId}/${goalId}.mp4`))
        .save(`${subDir}/${goalId}.mp4`);
    });
  }

  public async getStreamFile(prefix: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.config.tempDir, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          reject(err);
        }
        let fragments = '';
        for (const file of files) {
          if (file === `${prefix}.m3u8`) {
            fragments = `${this.config.tempDir}/${file}`;
          }
        }
        resolve(fragments);
      });
    });
  }

  private async getFragmentList(prefix: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.config.tempDir, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
          reject(err);
        }
        const fragments = [];
        for (const file of files) {
          if (file.includes(prefix) && !file.includes('.m3u8')) {
            fragments.push(`${this.config.tempDir}/${file}`);
          }
        }
        resolve(fragments);
      });
    });
  }

  private async createSubDir(subDir: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const recordsDir = `${this.config.recordsDir}/${subDir}`;
      fs.exists(`${this.config.recordsDir}/${subDir}`, (exist: boolean) => {
        if (exist) {
          resolve(recordsDir);
        } else {
          fs.mkdir(`${this.config.recordsDir}/${subDir}`, (err) => {
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
