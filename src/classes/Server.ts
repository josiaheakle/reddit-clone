import * as Express from "express";
import * as Morgan from "morgan";
import * as Winston from "winston";

import { initRoutes } from "../routes";

const exphbs = require('express-handlebars');

export default class Server {

    public app    : Express.Application;
    public router : Express.Router; 
    public logger : Winston.Logger;


    constructor() {
        require('dotenv').config();
        this.app = Express();
        this.setRoutes();
        this.setConfig();
        this.setLogger();
        this.setViewEngine();
    }

    public start() {
        this.app.listen(process.env.PORT);
        this.logger.info(`Server started at ${process.env.PORT}`);
    }

    private setViewEngine() {
        this.app.set(`views`, `./src/views`);
        const hbs = exphbs.create();
        this.app.engine('handlebars', hbs.engine);
        this.app.set(`view engine`, `handlebars`);
    }

    private setRoutes() {
        initRoutes(this.app);
    }

    private setConfig() {
        this.app.use(Express.json());
    }

    private setLogger() {
		this.logger = Winston.createLogger({
            level: 'info',
            format: Winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
              new Winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
              new Winston.transports.File({ filename: 'logs/combined.log' }),
            ],          
		});

		// Set up HTTP request logging
		const morganOptions: Morgan.Options = {
			stream: {
				write: (message) => {
					this.logger.info(message);
				},
			},
		};

		this.app.use(Morgan('combined', morganOptions));
	}

}