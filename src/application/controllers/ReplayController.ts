import { JsonController, Get, Post, Delete, BodyParam, Param, OnUndefined } from 'routing-controllers';
import { di, ILogger } from '@framework';
import { Type } from '@diType';

// import { RecordSerivce } from 'inf/record/RecordService';
// import { RecordRepository } from 'inf/record/RecordRepository';

@JsonController('/api/replay')
class RecordController {
  @di.inject(Type.AppLogger) private logger!: ILogger;
  // @di.inject(Type.RecordService) private recordService: RecordSerivce;
  // @di.inject(Type.RecordRepository) private recordRepository: RecordRepository;

  @Post('/')
  @OnUndefined(204)
  public async startGameRecording(
    @BodyParam('gameId') gameId: string
  ): Promise<void> {
    this.logger.info(`Record the game: ${gameId}`);

    // this.recordService.startRecording(gameId);
    // this.recordRepository.save(gameId);
  }

  @Delete('/')
  @OnUndefined(204)
  public async stopGameRecording(): Promise<void> {
    this.logger.info('Stop recordings');

    // this.recordService.stopRecording();
  }

  @Post('/:gameId')
  @OnUndefined(204)
  public async saveGoalReplay(
    @BodyParam('goalId') goalId: string
  ): Promise<void> {
    this.logger.info(`Record the goal: ${goalId}`);

    // this.recordService.cutFragment(goalId);
    // this.recordRepository
  }

  @Get('/:gameId')
  public async getReplay(
    @Param('goalId') _goalId: string
  ): Promise<string> {

    return '';
  }

}

export { RecordController };
