import fs from "fs";
import path from "path";
const rootFolder = "../data";
function saveData(key, value) {
  const fileName = path.join(rootFolder, key);
  fs.writeFileSync();
}

function loadData(key, value) {}
