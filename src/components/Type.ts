import { di } from '@framework';

export const Type = {
  ... di.Type,
  EnvironmentChecker: Symbol('EnvironmentChecker'),

  RecordService: Symbol('RecordService'),
  StreamService: Symbol('StreamService')
};
