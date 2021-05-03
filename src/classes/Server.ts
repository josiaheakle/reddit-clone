import * as Express from "express";
import * as Morgan from "morgan";
import * as Winston from "winston";
import * as HTTP from "http";

import path = require( "path" );

import { initRoutes } from "../routes";
import { handlebarsHelpers } from "../helpers/handlebarsHelpers";


const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


export default class Server {

    public app      : Express.Application;
    public router   : Express.Router; 
    public logger   : Winston.Logger;
    private server  : HTTP.Server;


    constructor() {
        require('dotenv').config();
        this.app = Express();
        this.setConfig();
        this.setLogger();
        this.setViewEngine();
        this.setStaticFiles();
        // this.setCloseOnExit();
        this.setRoutes();
    }

    public start() {
        this.server = this.app.listen(process.env.PORT);
        this.logger.info(`Server started at ${process.env.PORT}`);
    }

    private setCloseOnExit() {
        process.on('exit', () => {
            this.server.close();
        });
        process.on('uncaughtException', () => {
            this.server.close();

        });
        process.on('SIGTERM', () => {
            this.server.close();
        });
    }

    private setStaticFiles() {
        this.app.use('/assets', Express.static(path.join(__dirname, "../public")));
    }

    private setViewEngine() {
        const hbs = exphbs.create({
            helpers : handlebarsHelpers
        });
        this.app.engine('handlebars', hbs.engine);
        this.app.set(`view engine`, `handlebars`);
        this.app.set(`views`, `./src/views`);
    }

    private setRoutes() {
        initRoutes(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));
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