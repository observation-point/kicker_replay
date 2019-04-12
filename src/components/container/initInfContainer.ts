import { Container } from 'inversify';
import { ServiceConfig } from '@config';
import { getConfigFacotry, EnvironmentChecker } from '@framework';

import { IServiceDiscovery } from '../restClient/IServiceDiscovery';
import { ServiceDiscovery } from '../restClient/ServiceDiscovery';

export const InfType = {
  ServiceDiscovery: Symbol('ServiceDiscovery')
};

export async function initInfContainer(container: Container, options: { envName: string; }): Promise<void> {
  const configFacotry = getConfigFacotry(container);
  const envChecker = new EnvironmentChecker(process.env[options.envName] as string);
  // const recordsConfig = configFacotry.create(RecordsConfig);

  envChecker.isDev ?
  container.bind<IServiceDiscovery>(InfType.ServiceDiscovery)
    .toConstantValue(new ServiceDiscovery(configFacotry.create(ServiceConfig) as any)) : null;

}
