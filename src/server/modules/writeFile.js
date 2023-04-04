import fs from "fs/promises";
import { _dirname } from "../server.js";

export async function writeToFile(body) {
  let requestedFile = `${_dirname}../../content/offices/${body.office}.json`;
  let requestedFileContent;

  requestedFileContent = JSON.parse(
    await fs.readFile(requestedFile, { encoding: "utf-8" })
  );
  console.log("filecontent", requestedFileContent);

  for (let i = 0; i < requestedFileContent.length; i++) {
    if (requestedFileContent[i].position === body.position) {
      requestedFileContent[i].user = body.user;
      requestedFileContent[i].outlet = body.outlet;
    }
  }

  await fs.writeFile(
    requestedFile,
    JSON.stringify(requestedFileContent, null, 2)
  );
}
