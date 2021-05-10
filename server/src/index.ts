import { Server } from "./classes";
import { User } from "../src/types/schemas";

declare module 'express-session' {
    export interface SessionData {
      user?: User;
      messages?: Array<string>;
      seenMessages?: Array<string>;
    }
  }

import { initRoutes } from "./routes";
import { handlebarsHelpers } from "./helpers/handlebarsHelpers"


const path = require('path');

const reactBuild = path.join(__dirname, '..', '..', 'client', 'build');

const app = new Server( {
    initRoutes : initRoutes,
    reactBuild : reactBuild
} );

app.start();