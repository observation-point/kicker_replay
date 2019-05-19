import { JsonController, Post, BodyParam, Delete, OnUndefined } from 'routing-controllers';
import { di, ILogger } from '@framework';
import { Type } from '@diType';

import { StreamService } from '../../inf/stream/StreamService';

@JsonController('/api/stream')
class StreamController {
  @di.inject(Type.AppLogger) private logger!: ILogger;
  @di.inject(Type.StreamService) private streamService!: StreamService; 

  @Post('/')
  public async startRecording(
    @BodyParam('gameId') gameId: string
  ): Promise<string> {
    this.logger.info(`Start game recording: ${gameId}`);
    const result = await this.streamService.rec();
    Object.assign(result, { gameId });
    this.logger.warn(result);
    return result;
  }

  @Delete('/')
  @OnUndefined(204)
  public async stopRecording(
    @BodyParam('gameId') gameId: string
  ): Promise<void> {
    this.logger.info(`Stop game recording: ${gameId}`);
    this.streamService.stop();
  }

}

export { StreamController };
