import { Type } from '@diType';
import { Container } from 'inversify';
import { getConfigFacotry } from '@framework';
import { RecorderConfig } from '@config';

import { RecordService } from '../../inf/RecordService';
import { StreamService } from '../../inf/StreamService';

export async function initInfContainer(container: Container, _options: { envName: string; }): Promise<void> {
  const configFacotry = getConfigFacotry(container);
 
  container.bind<RecordService>(Type.RecordService)
    .toConstantValue(new RecordService(configFacotry.create(RecorderConfig)));

  container.bind<StreamService>(Type.StreamService)
    .toConstantValue(await new StreamService(configFacotry.create(RecorderConfig)).init());

}
