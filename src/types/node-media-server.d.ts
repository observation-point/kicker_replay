export = node_media_server;
declare class node_media_server {
  constructor(config: any);
  config: any;
  getSession(id: any): any;
  on(eventName: any, listener: any): void;
  run(): void;
  stop(): void;
}
