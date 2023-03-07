import express from "express";
import fs from "fs/promises";

const server = express();
const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());

server.listen(3000, console.log("listens to 3000"));
