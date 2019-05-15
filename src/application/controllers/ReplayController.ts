import { JsonController, Get, Post, BodyParam, Param, OnUndefined } from 'routing-controllers';
import { di, ILogger } from '@framework';
import { Type } from '@diType';

import { RecordService } from '../../inf/record/RecordService';

// import { RecordRepository } from '../../inf/record/RecordRepository';

@JsonController('/api/replay')
class RecordController {
  @di.inject(Type.AppLogger) private logger!: ILogger;
  @di.inject(Type.RecordService) private recordService!: RecordService;
  // @di.inject(Type.RecordRepository) private recordRepository: RecordRepository;

  @Post('/')
  @OnUndefined(204)
  public async saveGoalReplay(
    @BodyParam('gameId') gameId: string,
    @BodyParam('goalId') goalId: string
  ): Promise<string> {
    this.logger.info(`Record the goal: ${gameId}/${goalId}`);
    return await this.recordService.replay(gameId, goalId);
  }

  @Get('/:goalId')
  public async getReplay(
    @Param('goalId') goalId: string
  ): Promise<string> {
    if (goalId === '1') {
      this.logger.info(`Get the goal: ${goalId}`);
    } else {
    }
    return '';
  }

}

export { RecordController };
