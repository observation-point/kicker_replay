import { JsonController, Post, BodyParam, OnUndefined } from 'routing-controllers';
import { di } from '@framework';
import { Type } from '@diType';

import { RecordService } from '../../inf/RecordService';

@JsonController('/api/replay')
class RecordController {
  @di.inject(Type.RecordService) private recordService!: RecordService;

  @Post('/')
  @OnUndefined(204)
  public async saveGoalReplay(
    @BodyParam('gameId') gameId: string,
    @BodyParam('goalId') goalId: string
  ): Promise<string> {
    return await this.recordService.replay(gameId, goalId);
  }

}

export { RecordController };
