import * as Express from "express";
import * as Winston from "winston";

const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const cors = require('cors');

interface ServerOptions {
    initRoutes : (app:Express.Application,apiUri?:string) => void,
    apiUri? : string,
    reactBuild? : string,
    handlebarsHelpers?: { [index: string]: Function }
}

export class Server {

    public app: Express.Application;
    private apiUri : string;
    private logger: Winston.Logger;

    constructor(serverOptions : ServerOptions) {

        require('dotenv').config();
        this.app = Express();
        this.setDev(); //REMOVE LATER
        this.setConfig();
        this.setLogger();
        this.setSessionAuth();
        if (serverOptions.apiUri) this.setApi(serverOptions.apiUri);
        if (serverOptions.handlebarsHelpers) this.setViewEngine(serverOptions.handlebarsHelpers);
        this.setStaticFiles();
        this.setRoutes(serverOptions.initRoutes);
        if (serverOptions.reactBuild) this.setReactAppDefault(serverOptions.reactBuild);
        
    }

    public start() {
        this.app.listen(process.env.PORT);
        this.logger.info(`Server started at ${process.env.PORT}`);
    }

    private setApi(apiUri : string) {
        this.apiUri = apiUri;
    }

    private setStaticFiles() {
        this.app.use(Express.static(path.join(__dirname, '..', '..', '..', 'client', 'build')));
        this.app.use('/assets', Express.static(path.join(__dirname, "../public")));
    }

    private setReactAppDefault ( reactBuildLocation : string ) {
        console.log(`setting  react app as default ${reactBuildLocation}`);
        this.app.use((req : Express.Request, res : Express.Response, next : Function) => {
            res.sendFile(reactBuildLocation);
        });
    }

    private setViewEngine(handlebarsHelpers?: { [index: string]: Function }) {
        let hbs;
        if (handlebarsHelpers) {
            hbs = exphbs.create({
                helpers: handlebarsHelpers
            });
        } else {
            hbs = exphbs.create();
        }
        this.app.engine('handlebars', hbs.engine);
        this.app.set(`view engine`, `handlebars`);
        this.app.set(`views`, `./src/views`);
    }

    private setRoutes(initRoutes: (app:Express.Application,apiUri?:string) => void) {
        if (this.apiUri) initRoutes(this.app, this.apiUri);
        else initRoutes(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    private setSessionAuth() {
        this.app.use(cookieParser(process.env.SESSION_SECRET));
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            cookie: {
                maxAge: 36000,
                httpOnly: false,
                secure: false
            },
            resave: false,
            saveUninitialized: true
        }))
    }

    private setDev() {
        this.app.use(cors({
            origin: 'http://localhost:3000',
            optionSuccessStatus: 200
        }))
    }

    private setLogger() {

        const myFormat = Winston.format.printf(({ level, message, label, timestamp }) => {
            return `[${timestamp}] ${message}`;
        });

        this.logger = Winston.createLogger({
            level: 'info',
            format:  Winston.format.combine(
                Winston.format.timestamp(),
                myFormat
            ),
            defaultMeta: { service: 'user-service' },
            transports: [
                new Winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new Winston.transports.File({ filename: 'logs/combined.log' }),
            ],
        });

        const morganOptions = {
            stream: {
                write: (message) => {
                    this.logger.info(message);
                },
            },
        };
        this.app.use(morgan('combined', morganOptions));
    }

}