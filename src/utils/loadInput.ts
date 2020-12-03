import fs from "fs";
import path from "path";

export function loadInput(folder: string, { filename = "input" }: { filename?: string } = {}) {
    const filePath = path.resolve(__dirname, `../${folder}/${filename}.txt`);
    return fs.readFileSync(filePath, { encoding: "utf8" });
}
