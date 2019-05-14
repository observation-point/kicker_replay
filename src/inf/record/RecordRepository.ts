import { Repository, getRepository } from 'typeorm';
// import { plainToClass } from 'class-transformer';
import { Record } from './Record';

class RecordRepository {
  private repositoty: Repository<Record>;

  constructor() {
    this.repositoty = getRepository(Record);
  }

  public async findById(id: number): Promise<Record | undefined> {
    return await this.repositoty.findOne(id);
  }

  // public async save(image: Image): Promise<Image> {
  //   const model = plainToClass(ImageModel, image);
  //   await this.savePlain(model);
  //   image.id = model.id;
  //   return image;
  // }

  // public async savePlain(image: Image): Promise<Image> {
  //   return await this.repositoty.save(image);
  // }

}

export { RecordRepository };
