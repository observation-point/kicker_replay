import nodeMediaServer from 'node-media-server';

interface MediaServer {
  getSession(id: any): any;
  on(eventName: any, listener: any): void;
  run(): void;
  stop(): void;
}

export { nodeMediaServer, MediaServer };
