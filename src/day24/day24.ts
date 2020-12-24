import { loadInput, splitLines, Vector } from "../utils";
import _ from "lodash";

export function day24() {
    const input = loadInput("day24");
    const instructions = parseInput(input);

    return {
        part1: () => part1(instructions),
        part2: () => part2(instructions)
    };
}

type Direction = {
    x?: number;
    y?: number;
}
type Instruction = Direction[];
type Cardinal = "e" | "ne" | "nw" | "w" | "sw" | "se";
const directionByCardinal: Record<Cardinal, Direction> = {
    "e": { x: 1 },
    "ne": { y: 1 },
    "nw": { x: -1, y: 1 },
    "w": { x: -1 },
    "sw": { y: -1 },
    "se": { x: 1, y: -1 }
};

export function parseInput(input: string): Instruction[] {
    return splitLines(input).map(parseLine);

    function parseLine(line: string) {
        const directions: Direction[] = [];
        let i = 0;
        while (i < line.length) {
            let cardinal: Cardinal;
            if (line[i] === "e") { cardinal = "e"; }
            else if (line[i] === "n" && line[i + 1] === "e") { cardinal = "ne"; }
            else if (line[i] === "n" && line[i + 1] === "w") { cardinal = "nw"; }
            else if (line[i] === "w") { cardinal = "w"; }
            else if (line[i] === "s" && line[i + 1] === "w") { cardinal = "sw"; }
            else if (line[i] === "s" && line[i + 1] === "e") { cardinal = "se"; }
            else { throw new Error("Invalid input"); }
            directions.push(directionByCardinal[cardinal]);
            i += cardinal.length;
        }
        return directions;
    }
}

export function part1(instructions: Instruction[]) {
    const state = buildState(instructions);
    return state.size;
}

export function part2(instructions: Instruction[]) {
    const automaton = buildCellularAutomaton({
        initializer: buildState,
        neighborGetter: buildNeighborGetter()
    });

    automaton.initialize(instructions);
    automaton.runNTimes(100);
    return automaton.countActiveCells();

    function buildNeighborGetter() {
        return (key: string) => {
            const point = JSON.parse(key);
            return Object.values(directionByCardinal).map((direction) => {
                return JSON.stringify(Vector.translate(point, direction));
            });
        };
    }
}

function buildState(instructions: Instruction[]) {
    const cells = new Set<string>();
    instructions.forEach((instruction) => {
        let cell: Vector = { x: 0, y: 0 };
        instruction.forEach(direction => cell = Vector.translate(cell, direction));
        const stringifiedCell = JSON.stringify(cell);
        if (cells.has(stringifiedCell)) {
            cells.delete(stringifiedCell);
        } else {
            cells.add(stringifiedCell);
        }
    });
    return cells;
}

function buildCellularAutomaton(
    { initializer, neighborGetter }:
    {
        initializer: (instructions: Instruction[]) => Set<string>,
        neighborGetter: (key: string) => string[]
    }
) {
    let activeCells = new Set<string>();

    return {
        initialize(instructions: Instruction[]) {
            activeCells = initializer(instructions);
        },
        run() {
            const newActiveCells = new Set<string>();
            const cellsToUpdate = new Set<string>();
            activeCells.forEach((key) => {
                cellsToUpdate.add(key);
                neighborGetter(key).forEach(neighbor => cellsToUpdate.add(neighbor));
            });
            cellsToUpdate.forEach((key) => {
                const isActive = activeCells.has(key);
                const nbActiveNeighbors = neighborGetter(key).filter(neighbor => activeCells.has(neighbor)).length;
                if (isActive || nbActiveNeighbors === 2) { newActiveCells.add(key); }
                if (isActive && (nbActiveNeighbors === 0 || nbActiveNeighbors > 2)) { newActiveCells.delete(key); }
            });
            activeCells = newActiveCells;
        },
        runNTimes(n: number) {
            _.range(n).forEach(() => this.run());
        },
        countActiveCells() {
            return activeCells.size;
        }
    };
}
