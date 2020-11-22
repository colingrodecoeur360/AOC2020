const fs = require("fs");
const path = require("path");

export function loadInput(folder: string) {
    const filePath = path.resolve(__dirname, `../${folder}/input.txt`);
    return fs.readFileSync(filePath, { encoding: "utf8" });
}
