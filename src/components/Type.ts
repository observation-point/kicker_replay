import { di } from '@framework';

export const Type = {
  ... di.Type,
  EnvironmentChecker: Symbol('EnvironmentChecker'),
  DbConfig: Symbol('DbConfig'),

  DbConnection: Symbol('DbConnection'),
  ServiceDiscovery: Symbol('ServiceDiscovery')
};
