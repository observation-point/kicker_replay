import { ILogger, di } from '@framework';

import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import { FileHandler } from './FileHandler';
import { RecorderConfig } from '@config';

const fh = new FileHandler();

class Recorder {
  public name: any;
  public url: any;
  public timeLimit: any;
  public folder: any;
  public categoryType: any;
  public directoryPathFormat: any;
  public fileNameFormat: any;
  public disableStreaming!: boolean;
  public timer: any;
  public writeStream: any;
  public ffmpegPath: string;

  @di.inject(di.Type.AppLogger) private logger!: ILogger;

  constructor(config: RecorderConfig) {
    fh.createDirIfNotExists(config.recordTemp);
    fh.createDirIfNotExists(config.recordPath);
    this.ffmpegPath = config.ffmpegPath;
    this.writeStream.bind(this);
  }

  public getDirectoryPath() {
    return path.join(this.folder, (this.name ? this.name : ''));
  }

  public getExtenstion() {
    if (this.categoryType === 'audio') {
      return '.avi';
    }
    if (this.categoryType === 'image') {
      return '.jpg';
    }

    return '.mp4';
  }

  public getArguments() {
    if (this.categoryType === 'audio') {
      return ['-vn', '-acodec', 'copy'];
    }
    if (this.categoryType === 'image') {
      return ['-vframes', '1'];
    }
    return ['-acodec', 'copy', '-vcodec', 'copy'];
  }

  public getChildProcess(fileName: string): ChildProcess {
    const args = ['-i', this.url];
    const mediaArgs = this.getArguments();
    mediaArgs.forEach((item) => {
      args.push(item);
    });
    args.push(fileName);
    return spawn('ffmpeg', args, { detached: false, stdio: 'ignore' });
  }

  public stopRecording() {
    this.disableStreaming = true;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.writeStream) {
      this.killStream();
    }
  }

  public startRecording() {
    if (!this.url) {
      console.log('URL Not Found.');
      return true;
    }
    this.recordStream();
  }

  public killStream() {
    this.writeStream.kill();
  }

  public recordStream() {
    if (this.categoryType === 'image') {
      return;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.writeStream && this.writeStream.binded) {
      return false;
    }

    if (this.writeStream && this.writeStream.connected) {
      this.writeStream.binded = true;
      this.writeStream.once('exit', () => {
        this.recordStream();
      });
      this.killStream();
      return false;
    }

    this.writeStream = null;
    // const folderPath = this.getMediaTypePath();
    // fh.createDirIfNotExists(folderPath);
    // const fileName = this.getFilename(folderPath);
    // this.writeStream = this.getChildProcess(fileName);

    // this.writeStream.once('exit', () => {
    //   if (self.disableStreaming) {
    //     return true;
    //   }
    //   self.recordStream();
    // });
    // this.timer = setTimeout(self.killStream.bind(this), this.timeLimit * 1000);

    // console.log('Start record ' + fileName);
  }
}

export { Recorder };
