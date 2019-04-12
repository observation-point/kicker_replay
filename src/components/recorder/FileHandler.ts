import fs from 'fs';
import rimraf from 'rimraf';
import diskusage, { DiskUsage } from 'diskusage';

export class FileHandler {
  public createDirIfNotExists(folderPath: string) {
    try {
      if (!fs.lstatSync(folderPath).isDirectory()) {
        fs.mkdirSync(folderPath);
      }
    } catch (e) {
      fs.mkdirSync(folderPath);
    }
  }

  public removeDirectory(folderPath: string): void {
    rimraf(folderPath, _err => null);
  }

  public getDirectorySize(folderPath: string): DiskUsage {
    return diskusage.checkSync(folderPath);
  }
}
