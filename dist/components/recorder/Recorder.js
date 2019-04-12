"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _framework_1 = require("@framework");
const childProcess = require("child_process");
const path_1 = require("path");
const FileHandler_1 = require("./FileHandler");
const fh = new FileHandler_1.FileHandler();
class RTSPRecorder {
    constructor(config) {
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
    getDirectoryPath() {
        return path_1.default.join(this.folder, (this.name ? this.name : ''));
    }
    getTodayPath() {
        return path_1.default.join(this.getDirectoryPath(), moment().format(this.directoryPathFormat));
    }
    getMediaTypePath() {
        return path_1.default.join(this.getTodayPath(), this.categoryType);
    }
    getFilename(folderPath) {
        return path_1.default.join(folderPath, moment().format(this.fileNameFormat) + this.getExtenstion());
    }
    getExtenstion() {
        if (this.categoryType === 'audio') {
            return '.avi';
        }
        if (this.categoryType === 'image') {
            return '.jpg';
        }
        return '.mp4';
    }
    getArguments() {
        if (this.categoryType === 'audio') {
            return ['-vn', '-acodec', 'copy'];
        }
        if (this.categoryType === 'image') {
            return ['-vframes', '1'];
        }
        return ['-acodec', 'copy', '-vcodec', 'copy'];
    }
    getChildProcess(fileName) {
        const args = ['-i', this.url];
        const mediaArgs = this.getArguments();
        mediaArgs.forEach((item) => {
            args.push(item);
        });
        args.push(fileName);
        return childProcess.spawn('ffmpeg', args, { detached: false, stdio: 'ignore' });
    }
    stopRecording() {
        this.disableStreaming = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.writeStream) {
            this.killStream();
        }
    }
    startRecording() {
        if (!this.url) {
            console.log('URL Not Found.');
            return true;
        }
        this.recordStream();
    }
    captureImage(cb) {
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
    killStream() {
        this.writeStream.kill();
    }
    recordStream() {
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
__decorate([
    _framework_1.di.inject(_framework_1.di.Type.AppLogger),
    __metadata("design:type", Object)
], RTSPRecorder.prototype, "logger", void 0);
exports.RTSPRecorder = RTSPRecorder;
//# sourceMappingURL=Recorder.js.map