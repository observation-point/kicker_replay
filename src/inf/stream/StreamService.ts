import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import path from 'path';
import { check } from 'diskusage';

import { Type } from '@diType';
import { ILogger, di } from '@framework';
import { StreamConfig } from '@config';

class StreamService {
  @di.inject(Type.AppLogger)
  private logger!: ILogger;

  private config: StreamConfig;
  private cmd: ffmpeg.FfmpegCommand;

  constructor(config: StreamConfig) {
    this.config = config;
    this.cmd = this.initFFmpeg()
      .setFfmpegPath(this.config.ffmpegPath)
      .setFfprobePath(this.config.ffprobePath);
  }

  public async init(): Promise<StreamService> {
    if (this.config.checkStream) {
      this.logger.info('Check stream from camera ...');
      await this.checkInputStream(this.config.streamUrl);
    }
    return this;
  }

  public async rec(name: string): Promise<string|never> {
    await this.checkFreeSpace();
    await this.cleanDirectory(this.config.tempDir);
    this.cmd
      .addInput(this.config.streamUrl)
      .addInputOptions([
        '-fflags nobuffer',
        // `-rtsp_transport ${this.config.rtspTransport}`,
      ])
      .addOptions([
        '-vsync 0',
        '-copyts',
        '-vcodec copy',
        '-movflags frag_keyframe+empty_moov',
        '-an',
        '-hls_time 2',
        '-hls_list_size 10',
        '-hls_flags delete_segments+append_list+omit_endlist'
      ])
      .addOutput(`${this.config.tempDir}/${name}.m3u8`)
      .outputFormat('hls');

    return await new Promise((resolve, reject) => {
      this.cmd
        .on('codecData', (data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error('Не повезло!'));
          }
        })
        .run();
    });
  }

  public stop(): void {
    this.cmd.kill('SIGINT');
    this.cmd = this.initFFmpeg();
  }

  public checkInputStream(streamUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(streamUrl, (err, data) => {
        if (err) {
          this.logger.error(err);
          reject();
        }
        this.logger.info(data);
        resolve();
      });
    });
  }

  private async checkFreeSpace(): Promise<void> {
    const { free } = await check(this.config.tempDir);
    const freeSpace = Math.round(free / 1e6);
    const freeSpaceMsg = `Freespace: ${freeSpace.toFixed(0)} mb`;
    if (freeSpace > 1e3) {
      this.logger.info(freeSpaceMsg);
    } else {
      this.logger.warn(freeSpaceMsg);
    }
  }

  private cleanDirectory(directory: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err) reject(err);
        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) reject(err);
          });
          resolve();
        }
      });
    });
  }

  private initFFmpeg(): ffmpeg.FfmpegCommand {
    return ffmpeg()
    .on('start', (data: any) => this.logger.info(data))
    .on('stderr', (data: any) => this.logger.trace(data))
    .on('end', () => this.logger.warn('Стрим пропал!'))
    .on('error', (err: Error) => {
      if (!err.message.includes('ffmpeg exited with code 255')) {
        this.logger.fatal(err.message);
        process.exit(1);
      }
      this.logger.error(err.message);
    });
  }
}

export { StreamService };
