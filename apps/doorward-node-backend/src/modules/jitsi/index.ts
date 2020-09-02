import express from 'express';
import JitsiController from './JitsiController';

const Router = express.Router();

Router.get('/jitsi/branding', JitsiController.getBranding);

export default Router;
