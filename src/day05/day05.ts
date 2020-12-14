import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day05() {
    const input = loadInput("day05");
    const boardingPasses = splitLines(input) as BoardingPass[];

    return {
        part1: () => part1(boardingPasses),
        part2: () => part2(boardingPasses)
    };
}

type BoardingPass = string;
type Mapper = Record<string, 0 | 1>;

const ROW_MAPPER: Mapper = { F: 0, B: 1 };
const COLUMN_MAPPER: Mapper = { L: 0, R: 1 };

function part1(boardingPasses: BoardingPass[]) {
    return _.max(boardingPasses.map(getSeatId));
}

function part2(boardingPasses: BoardingPass[]) {
    const seatIdSet = new Set(boardingPasses.map(getSeatId));
    for (const seatId of seatIdSet) {
        if (! seatIdSet.has(seatId + 1) && seatIdSet.has(seatId + 2)) {
            return seatId + 1;
        }
    }
    return null;
}

export function getSeatId(boardingPass: BoardingPass) {
    const [row, column] = [boardingPass.slice(0, 7), boardingPass.slice(7)];
    return 8 * convertFromBinary(row, ROW_MAPPER) + convertFromBinary(column, COLUMN_MAPPER);

    function convertFromBinary(identifier: string, mapper: Mapper) {
        return parseInt(Array.from(identifier).map(x => mapper[x]).join(""), 2);
    }
}

