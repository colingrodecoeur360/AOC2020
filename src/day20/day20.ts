import { loadInput, multiply, splitLines, splitParagraphs, toInt } from "../utils";
import _ from "lodash";

const IMAGE_SIZE = 10;

export function day20() {
    const input = loadInput("day20");
    const tilesById = parseInput(input);

    return {
        part1: () => part1(tilesById),
        part2: () => part2(tilesById)
    };
}

type Cells = string[][];

interface BaseTile {
    tileId: string;
    cells: Cells;
}

interface Tile extends BaseTile {
    top: string[];
    right: string[];
    bottom: string[];
    left: string[];
}

export function parseInput(input: string) {
    const tilesById: Record<string, Tile> = {};
    const paragraphs = splitParagraphs(input);
    paragraphs.forEach((paragraph) => {
        const lines = splitLines(paragraph);
        const tileId = lines[0].replace("Tile ", "").replace(":", "");
        const cells = lines.slice(1).map(line => line.split(""));
        tilesById[tileId] = {
            tileId,
            cells,
            top: cells[0],
            right: cells.map(row => row[IMAGE_SIZE - 1]),
            bottom: cells[IMAGE_SIZE - 1],
            left: cells.map(row => row[0])
        };
    });
    return tilesById;
}

type Side = "top" | "right" | "bottom" | "left";

export function part1(tilesById: Record<string, Tile>) {
    const tileIdsByPattern: Record<string, string[]> = {};
    Object.entries(tilesById).forEach(([tileId, tile]) => {
        ["top", "right", "bottom", "left"].forEach((side: Side) => {
            if (! tileIdsByPattern[tile[side].join("")]) { tileIdsByPattern[tile[side].join("")] = []; }
            tileIdsByPattern[tile[side].join("")].push(tileId);
        });
    });
    const corners: Record<string, Side[]> = {};
    Object.entries(tilesById).forEach(([tileId, tile]) => {
        const sidesWithNoMatch: Side[] = [];
        ["top", "right", "bottom", "left"].forEach((side: Side) => {
            const matchingTiles = getMatchingTiles(tile, side, tileIdsByPattern);
            if (matchingTiles.size === 0) { sidesWithNoMatch.push(side); }
        });

        if (sidesWithNoMatch.length == 2) {
            corners[tileId] = sidesWithNoMatch;
        }
    });

    return multiply(Object.keys(corners).map(toInt));

    function getMatchingTiles(tile: Tile, side: Side, idsByPattern: Record<string, string[]>) {
        const matchingTiles = new Set();
        idsByPattern[tile[side].join("")].forEach(matchingTileId => matchingTiles.add(matchingTileId));
        (idsByPattern[[...tile[side]].reverse().join("")] || []).forEach(matchingTileId => matchingTiles.add(matchingTileId));
        matchingTiles.delete(tile.tileId);
        return matchingTiles;
    }
}

export function part2(tilesById: Record<string, Tile>) {
    const solutions: Record<number, Record<number, BaseTile>> = {};
    const nbTiles = Object.keys(tilesById).length;
    const gridSize = Math.sqrt(nbTiles);
    _.range(gridSize).forEach(i => solutions[i] = {});
    let candidates = generateAllPossibleTiles(tilesById);

    const startingTileId = "1847";

    solutions[0][0] = { tileId: startingTileId, cells: tilesById[startingTileId].cells };
    candidates = candidates.filter(tile => tile.tileId !== startingTileId);

    _.range(gridSize).forEach((i) => {
        _.range(gridSize).forEach((j) => {
            if (solutions[i][j]) { return; }
            const matchingTiles = getMatchingTiles(i, j);
            if (matchingTiles.length === 0) { throw new Error("Impossible puzzle"); }
            if (matchingTiles.length > 1) { return; }
            solutions[i][j] = { tileId: matchingTiles[0].tileId, cells: matchingTiles[0].cells };
            candidates = candidates.filter(tile => tile.tileId !== matchingTiles[0].tileId);
        });
    });

    const fullImage = computeFullImage();
    const imageCandidates = generateImageCandidates(fullImage);

    const seaMonsterPattern = buildSeaMonsterPattern();
    const seaMonsterDimensions = [3, 20];


    for (const imageCandidate of imageCandidates) {
        let seaMonstersFound = 0;
        const imageCopy = _.cloneDeep(imageCandidate);
        _.range((IMAGE_SIZE - 2) * gridSize - seaMonsterDimensions[0]).forEach((i) => {
            _.range((IMAGE_SIZE - 2) * gridSize - seaMonsterDimensions[1]).forEach((j) => {
                for (const [x, y] of seaMonsterPattern) {
                    if (imageCandidate[i + x][j + y] !== "#") { return; }
                }
                seaMonstersFound += 1;
                for (const [x, y] of seaMonsterPattern) {
                    imageCopy[i + x][j + y] = "O";
                }
            });
        });
        if (seaMonstersFound) {
            return imageCopy.flat().filter(cell => cell === "#").length;
        }
    }

    function getMatchingTiles(i: number, j: number) {
        return candidates.filter((candidateTile) => {
            if (i > 0 && solutions[i - 1][j]) {
                const pattern = getBottomBorder(solutions[i - 1][j].cells).join("");
                if (pattern !== getTopBorder(candidateTile.cells).join("")) { return false; }
            }
            if (j > 0 && solutions[i][j - 1]) {
                const pattern = getRightBorder(solutions[i][j - 1].cells).join("");
                if (pattern !== getLeftBorder(candidateTile.cells).join("")) { return false; }
            }
            return true;
        });
    }

    function computeFullImage() {
        const image = initializeImage();
        _.range(gridSize).forEach((i) => {
            _.range(gridSize).forEach((j) => {
                const solution = solutions[i][j];
                solution.cells.forEach((row, rowIndex) => {
                    if (rowIndex === 0 || rowIndex === IMAGE_SIZE - 1) { return; }
                    row.forEach((value, colIndex) => {
                        if (colIndex === 0 || colIndex === IMAGE_SIZE - 1) { return; }
                        image[(IMAGE_SIZE - 2) * i + rowIndex - 1][(IMAGE_SIZE - 2) * j + colIndex - 1] = value;
                    });
                });
            });
        });
        return image;

        function initializeImage() {
            return _.range((IMAGE_SIZE - 2) * gridSize).map(() => {
                return _.range((IMAGE_SIZE - 2) * gridSize).map(() => {
                    return "";
                });
            });
        }
    }

    function generateImageCandidates(image: Cells) {
        return [
            image,
            rotate(image),
            rotate(rotate(image)),
            rotate(rotate(rotate(image))),
            flip(image),
            rotate(flip(image)),
            rotate(rotate(flip(image))),
            rotate(rotate(rotate(flip(image)))),
        ];
    }
}

export function generateAllPossibleTiles(tilesById: Record<string, BaseTile>) {
    const result: { tileId: string, cells: Cells }[] = [];
    Object.entries(tilesById).forEach(([tileId, tile]) => {
        result.push({ tileId, cells: tile.cells });
        result.push({ tileId, cells: rotate(tile.cells) });
        result.push({ tileId, cells: rotate(rotate(tile.cells)) });
        result.push({ tileId, cells: rotate(rotate(rotate(tile.cells))) });
        result.push({ tileId, cells: flip(tile.cells) });
        result.push({ tileId, cells: rotate(flip(tile.cells)) });
        result.push({ tileId, cells: rotate(rotate(flip(tile.cells))) });
        result.push({ tileId, cells: rotate(rotate(rotate(flip(tile.cells)))) });
    });
    return result;
}


function buildSeaMonsterPattern() {
    return [[0, 18], [1, 0], [1, 5], [1, 6], [1, 11], [1, 12], [1, 17], [1, 18], [1, 19], [2, 1], [2, 4], [2, 7], [2, 10], [2, 13], [2, 16]];
}

function getTopBorder(cells: Cells) {
    return cells[0];
}
function getRightBorder(cells: Cells) {
    return cells.map(row => row[IMAGE_SIZE - 1]);
}
function getBottomBorder(cells: Cells) {
    return cells[IMAGE_SIZE - 1];
}
function getLeftBorder(cells: Cells) {
    return cells.map(row => row[0]);
}

export function flip(cells: Cells): Cells {
    return _.cloneDeep(cells).map(row => row.reverse());
}
export function rotate(cells: Cells): Cells {
    const newCells = _.cloneDeep(cells);
    const n = newCells.length;
    _.range(n).forEach(i => {
        _.range(n).forEach(j => {
            newCells[j][n - 1 - i] = cells[i][j];
        });
    });
    return newCells;
}
