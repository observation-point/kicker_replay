import { JsonController, Get, Param } from 'routing-controllers';
import { di, ILogger } from '@framework';
import { Type } from '@diType';

@JsonController('/api/replay')
export class ProfileController {
  @di.inject(Type.AppLogger) private logger!: ILogger;

  @Get('/:goalId')
  public async getGoalReplay(
    @Param('goalId') goalId: string
  ): Promise<any> {
    this.logger.info('Get goal replay!');
    this.logger.warn(goalId);
    // const userId = request.user!.id;
    // const photos = request.files;

    // const uploadVendorPhotoHandler = new UploadVendorPhotoUsecase(this.vendorRepository, this.imageService);
    // const uploadVendorPhotoCmd = { userId, photos };
    // const uploadResult = await uploadVendorPhotoHandler.handle(uploadVendorPhotoCmd);
    // return this.view.renderVendorPhoto(uploadResult);
    return { goalId, url: '234' };
  }

}
