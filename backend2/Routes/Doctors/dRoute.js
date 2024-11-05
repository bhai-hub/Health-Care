import express from 'express';
import login from '../../Controller/Doctor/Auth.js';
const dRouter = express.Router();

dRouter.post("/login", login)

export default dRouter