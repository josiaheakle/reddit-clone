import { Server } from "./classes";
import { User } from "../src/types/schemas";
import { initRoutes } from "./routes";

const path = require('path');

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    messages : Array<string>;
    seenMessages : Array<string>;
  }
}

declare module 'express' {
  export interface Request {
    userId?: number;
  }
}

const reactBuild = path.join(__dirname, '..', '..', 'client', 'build');

const app = new Server( {
    initRoutes : initRoutes,
    reactBuild : reactBuild,
    apiUri: '/api'
} );

app.start();