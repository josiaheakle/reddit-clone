import { Server } from "./classes";

import { initRoutes } from "./routes";
import { handlebarsHelpers } from "./helpers/handlebarsHelpers"

const app = new Server( initRoutes, handlebarsHelpers );

app.start();