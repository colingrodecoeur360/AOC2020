import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day11() {
    const input = loadInput("day11");
    const lines = parseInput(input);

    return {
        part1: () => part1(lines),
        part2: () => part2(lines)
    };
}

export function parseInput(input: string) {
    return splitLines(input);
}

export function part1(lines: string[]) {
    const rule = {
        immediateNeighbors: true,
        reproduction: 0,
        extinction: 4
    };
    const seatMap = buildSeatMap(lines, rule);
    seatMap.stabilize();
    return seatMap.getNbOccupiedSeats();
}

export function part2(lines: string[]) {
    const rule = {
        immediateNeighbors: false,
        reproduction: 0,
        extinction: 5
    };
    const seatMap = buildSeatMap(lines, rule);
    seatMap.stabilize();
    return seatMap.getNbOccupiedSeats();
}

export function buildSeatMap(lines: string[], rule: Rule) {
    const iterations = [getInitialSeats()];

    return {
        stabilize() {
            while(haveSeatsChanged()) {
                iterations.unshift(computeUpdatedSeats());
            }
        },
        getNbOccupiedSeats() {
            return getCurrentSeats().flat().filter(seat => seat === "#").length;
        }
    };

    function getInitialSeats() {
        return lines.map(line => line.split(""));
    }
    function getCurrentSeats() {
        return iterations[0];
    }
    function haveSeatsChanged() {
        if (iterations.length < 2) { return true; }
        return JSON.stringify(iterations[0]) !== JSON.stringify(iterations[1]);
    }
    function computeUpdatedSeats() {
        const currentSeats = getCurrentSeats();
        const newSeats = _.cloneDeep(currentSeats);

        currentSeats.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const currentSeat = currentSeats[rowIndex][columnIndex];
                if (currentSeat === ".") { return; }

                const neighborsByType = getNeighborsByType(rowIndex, columnIndex);
                if (currentSeat === "L" && neighborsByType["#"] === rule.reproduction) {
                    newSeats[rowIndex][columnIndex] = "#";
                }
                if (currentSeat === "#" && neighborsByType["#"] >= rule.extinction) {
                    newSeats[rowIndex][columnIndex] = "L";
                }
            });
        });
        return newSeats;

        function getNeighborsByType(baseRowIndex: number, baseColumnIndex: number) {
            const neighborsByType: Record<string, number> = { "#": 0, "L": 0 };
            getDirections().forEach(([deltaRow, deltaColumn]) => {
                let shouldStopExploration = rule.immediateNeighbors;
                let steps = 1;
                do {
                    const rowIndex = baseRowIndex + steps * deltaRow;
                    const columnIndex = baseColumnIndex + steps * deltaColumn;
                    if (isOutsideGrid(rowIndex, columnIndex)) {
                        shouldStopExploration = true;
                    } else if (currentSeats[rowIndex][columnIndex] === "#") {
                        neighborsByType["#"]++;
                        shouldStopExploration = true;
                    } else if (currentSeats[rowIndex][columnIndex] === "L") {
                        neighborsByType["L"]++;
                        shouldStopExploration = true;
                    } else {
                        steps++;
                    }
                } while (! shouldStopExploration);
            });
            return neighborsByType;
        }
    }

    function getDirections() {
        return [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];
    }
    function isOutsideGrid(rowIndex: number, columnIndex: number) {
        const seats = getCurrentSeats();
        const nbRows = seats.length;
        const nbColumns = seats[0].length;
        return rowIndex < 0
            || rowIndex >= nbRows
            || columnIndex < 0
            || columnIndex >= nbColumns;
    }
}

interface Rule {
    immediateNeighbors: boolean;
    reproduction: number;
    extinction: number;
}
