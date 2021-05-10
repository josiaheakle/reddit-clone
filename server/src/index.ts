import { Server } from "./classes";
import { User } from "../src/types/schemas";
import { initRoutes } from "./routes";

declare module 'express-session' {
    export interface SessionData {
      user?: User;
      messages?: Array<string>;
      seenMessages?: Array<string>;
    }
  }



const path = require('path');

const reactBuild = path.join(__dirname, '..', '..', 'client', 'build');

const app = new Server( {
    initRoutes : initRoutes,
    reactBuild : reactBuild
} );

app.start();