import { ILogger, di } from '@framework';

import * as childProcess from 'child_process';
import path from 'path';
import { FileHandler } from './FileHandler';
import { RecordsConfig } from '@config';

const fh = new FileHandler();

export class RTSPRecorder {

  public config: {};
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

  @di.inject(di.Type.AppLogger) private logger!: ILogger;

  constructor(config: RecordsConfig) {
    this.config = config;
    this.name = config.name;
    this.url = config.url;
    this.timeLimit = config.timeLimit || 60;
    this.folder = config.folder || 'media/';
    this.categoryType = config.type || 'video';
    this.directoryPathFormat = config.directoryPathFormat || 'MMM-Do-YY';
    this.fileNameFormat = config.fileNameFormat || 'YYYY-M-D-h-mm-ss';
    fh.createDirIfNotExists(this.getDirectoryPath());
    fh.createDirIfNotExists(this.getTodayPath());
    this.writeStream.bind(this);
  }

  public getDirectoryPath() {
    return path.join(this.folder, (this.name ? this.name : ''));
  }

  public getTodayPath() {
    return path.join(this.getDirectoryPath(), moment().format(this.directoryPathFormat));
  }

  public getMediaTypePath() {
    return path.join(this.getTodayPath(), this.categoryType);
  }

  public getFilename(folderPath) {
    return path.join(folderPath, moment().format(this.fileNameFormat) + this.getExtenstion());
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

  public getChildProcess(fileName) {
    const args = ['-i', this.url];
    const mediaArgs = this.getArguments();
    mediaArgs.forEach((item) => {
      args.push(item);
    });
    args.push(fileName);
    return childProcess.spawn('ffmpeg', args, { detached: false, stdio: 'ignore' });
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

  public captureImage(cb) {
    this.writeStream = null;
    const folderPath = this.getMediaTypePath();
    fh.createDirIfNotExists(folderPath);
    const fileName = this.getFilename(folderPath);
    this.writeStream = this.getChildProcess(fileName);
    this.writeStream.once('exit', () => {
      if (cb) {
        cb();
      }
    });
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
    const folderPath = this.getMediaTypePath();
    fh.createDirIfNotExists(folderPath);
    const fileName = this.getFilename(folderPath);
    this.writeStream = this.getChildProcess(fileName);

    this.writeStream.once('exit', () => {
      if (self.disableStreaming) {
        return true;
      }
      self.recordStream();
    });
    this.timer = setTimeout(self.killStream.bind(this), this.timeLimit * 1000);

    console.log('Start record ' + fileName);
  }
}
