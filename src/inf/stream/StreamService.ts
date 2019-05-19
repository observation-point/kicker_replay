import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import { check } from 'diskusage';

import { Type } from '@diType';
import { ILogger, di } from '@framework';
import { RecorderConfig } from '@config';

class StreamService {
  @di.inject(Type.AppLogger)
  private logger!: ILogger;

  private config: RecorderConfig;
  private cmd: ffmpeg.FfmpegCommand;

  constructor(config: RecorderConfig) {
    this.config = config;
    this.cmd = this.initFFmpeg();
  }

  public async init(): Promise<StreamService> {
    if (this.config.checkStream) {
      this.logger.info('Check stream from camera ...');
      await this.checkInputStream(this.config.streamUrl);
    }
    return this;
  }

  public async rec(): Promise<string|never> {
    await this.checkFreeSpace();
    this.cleanDirectory(this.config.streamDir);

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
        `-hls_time ${this.config.fragmentDuration}`,
        `-hls_list_size ${Math.floor(this.config.streamDuration / this.config.fragmentDuration)}`,
        '-hls_flags delete_segments+append_list+omit_endlist'
      ])
      .addOutput(`${this.config.streamDir}/game.m3u8`)
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

  private cleanDirectory(directory: string): void {
    fs.readdir(directory, (err, files) => {
      if (err) {
        this.logger.error(err);
      }

      if (files) {        
        for (const file of files) {
          fs.unlink(`${directory}/${file}`, (err) => {
            if (err) {
              this.logger.error(err);
            }
          });
        }
      }
    });
  }

  private async checkFreeSpace(): Promise<void> {
    const { free } = await check(this.config.streamDir);
    const freeSpace = Math.round(free / 1e6);
    const freeSpaceMsg = `Freespace: ${freeSpace.toFixed(0)} mb`;
    if (freeSpace > 1e3) {
      this.logger.info(freeSpaceMsg);
    } else {
      this.logger.warn(freeSpaceMsg);
    }
  }

  private initFFmpeg(): ffmpeg.FfmpegCommand {
    return ffmpeg()
    .setFfmpegPath(this.config.ffmpegPath)
    .setFfprobePath(this.config.ffprobePath)
    .on('start', (data: any) => this.logger.info(data))
    .on('stderr', (data: any) => this.logger.debug(data))
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
