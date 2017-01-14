import {ServerApp} from './server_app'

var serverApp = new ServerApp();

serverApp.setRoutes();

serverApp.startServer();