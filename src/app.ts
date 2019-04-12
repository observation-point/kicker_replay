import './bootstrap';
import { resolve } from 'path';
import { Application } from '@framework';
import { initContainer } from './initContainer';

const CONTROLLERS_PATH = resolve(__dirname, './application/controllers/**/*.js');

void initContainer().then(async () => {
  const app = new Application([CONTROLLERS_PATH], []);
  app.run();
});
