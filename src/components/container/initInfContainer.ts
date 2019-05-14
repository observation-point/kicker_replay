// import { Type } from 'components/Type';
// import { Container } from 'inversify';
// import { RecorderConfig } from '@config';
// import { getConfigFacotry, EnvironmentChecker } from '@framework';

// import { IServiceDiscovery } from '../restClient/IServiceDiscovery';
// import { ServiceDiscovery } from '../restClient/ServiceDiscovery';
// import { RecordSerivce } from 'inf/record/RecordService';

// export async function initInfContainer(container: Container, options: { envName: string; }): Promise<void> {
  // const configFacotry = getConfigFacotry(container);
  // const envChecker = new EnvironmentChecker(process.env[options.envName] as string);

  // envChecker.isDev ?
  // container.bind<IServiceDiscovery>(Type.ServiceDiscovery)
  //   .toConstantValue(new ServiceDiscovery(configFacotry.create(ServiceConfig) as any)) : null;

  // container.bind<RecordSerivce>(Type.RecordService)
  //   .toConstantValue(new RecordSerivce(configFacotry.create(RecorderConfig)));

// }
