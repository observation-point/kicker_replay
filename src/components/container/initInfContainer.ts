import { Type } from '@diType';
import { Container } from 'inversify';
import { getConfigFacotry } from '@framework';
import { RecordConfig, StreamConfig } from '@config';

import { RecordService } from '../../inf/record/RecordService';
import { StreamService } from '../../inf/stream/StreamService';

// import { IServiceDiscovery } from '../restClient/IServiceDiscovery';
// import { ServiceDiscovery } from '../restClient/ServiceDiscovery';

export async function initInfContainer(container: Container, _options: { envName: string; }): Promise<void> {
  const configFacotry = getConfigFacotry(container);
  // const envChecker = new EnvironmentChecker(process.env[options.envName] as string);

  // envChecker.isDev ?
  // container.bind<IServiceDiscovery>(Type.ServiceDiscovery)
  //   .toConstantValue(new ServiceDiscovery(configFacotry.create(ServiceConfig) as any)) : null;

  container.bind<RecordService>(Type.RecordService)
    .toConstantValue(new RecordService(configFacotry.create(RecordConfig)));

  container.bind<StreamService>(Type.StreamService)
    .toConstantValue(await new StreamService(configFacotry.create(StreamConfig)).init());

}
