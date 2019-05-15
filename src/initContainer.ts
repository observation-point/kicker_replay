import { bindMainComponents, di } from '@framework';
import { initInfContainer } from './components/container';

export async function initContainer(): Promise<void> {
  const options = { envName: 'KICKER_REPLAY_ENV', baseDir: __dirname };

  await bindMainComponents(di.container, options);
  await initInfContainer(di.container, options);
  // await initDatabaseContainer(di.container, options);

}
