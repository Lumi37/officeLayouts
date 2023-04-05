process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
import express from "express";
import { r } from "./router.js";

const server = express();
export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());
server.use(r)

server.listen(3000, console.log("listens to 3000"));
